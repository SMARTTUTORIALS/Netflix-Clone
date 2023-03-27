import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';
import db from '../utils/firebaseUtils';
import './PlansScreen.css';

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const [subscription, setSubscription] = useState(null);
    const user = useSelector(selectUser);

    useEffect(() => {
        db.collection('customers')
            .doc(user.uid)
            .collection('subscriptions')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(async subscription => {
                    setSubscription({
                        role: subscription.data().role,
                        current_period_start: subscription.data().current_period_start.seconds,
                        current_period_end: subscription.data().current_period_end.seconds,
                    });
                });
            });

    }, [user.uid]);

    useEffect(() => {
        /*
        use the db object from firebaseUtils to get the products collection and filter only
        active products.
        */
        db.collection('products')
            .where('active', "==", true)
            .get()
            .then(querySnapshot => {

                /*
                Create a custom products object to destructure and fetch only required info
                The get() returns a query snapshot which can have multiple products as documents(non relational db)
                */
                const productsInfo = {};

                querySnapshot.forEach(async productDoc => {

                    /*
                    The operation to collect the data could take sometime hence async function
                    Fetching the product document which has product information.
    
                    */
                    productsInfo[productDoc.id] = productDoc.data();

                    /*
                    Each product has inner document for prices
                    So here an async request is made to get the prices collection which again
                    returns a document with pricing info.
                    */
                    const priceSnap = await productDoc.ref.collection('prices').get();

                    /*
                    The pricing data returned above can have multiple prices for one product.
                    */

                    priceSnap.docs.forEach(price => {
                        productsInfo[productDoc.id].prices = {
                            priceId: price.id,
                            priceData: price.data(),
                        }
                    });
                });
                //update the products state
                setProducts(productsInfo);
            });

    }, []);


    const loadCheckout = async (priceId, productName) => {

        alert(`You have selected : "${productName}".\nYou will be redirected to the checkout page for completing the purchase.`);
        const docRef = await db.collection('customers')
            .doc(user.uid)
            .collection("checkout_sessions")
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            });

        docRef.onSnapshot(async (snapshot) => {
            const { error, sessionId } = snapshot.data();

            if (error) {
                alert(`An error occurred: ${error.message}`);
            }

            if (sessionId) {
                // We have a session, let's redirect to Checkout
                // Initialize Stripe
                const stripeKey = process.env.REACT_APP_BASE_URL_STRIPE;
                const stripe = await loadStripe(stripeKey);

                stripe.redirectToCheckout({ sessionId });

            }
        })
    };


    return (
        <div className='plansScreen'>
            {
                subscription &&
                <p>Renewal date:
                    {
                        new Date(subscription?.current_period_end * 1000)
                            .toLocaleDateString()
                    }
                </p>
            }
            {Object.entries(products).map(([productId, productData]) => {
                // TODO: add some logic to check if user's subscription is active

                const isCurrentPackage = productData.name?.toLowerCase()
                    .includes(subscription?.role);

                return (
                    <div className={`${isCurrentPackage && 'plansScreen_plan--disabled'} plansScreen_plan`} key={productId}>
                        <div className='plansScreen_info'>
                            <h4>{productData.name}</h4>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => (!isCurrentPackage && loadCheckout(productData.prices.priceId, productData.name))}>
                            {isCurrentPackage ? 'Current Package' : 'Subscribe'}
                        </button>
                    </div>
                );
            })}

        </div>
    )
}

export default PlansScreen