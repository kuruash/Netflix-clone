import React, { useEffect, useState } from "react";
import "./PlansScreen.css";
import db from "../firebase";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from 'react-redux';
import { selectUser } from "../features/userSlice";

function PlansScreen() {

    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        db.collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(async subscription => {
                setSubscription({
                    role: subscription.data().role,
                    current_persiod_end: subscription.data().current_persiod_end.seconds,
                    current_persiod_start: subscription.data().current_persiod_start.seconds

                })
            })
        })
    }, [user.uid])

    useEffect(() => {
        db.collection("products")
        .where("active", "==", true)
        .get()
        .then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection("prices").get();
                priceSnap.docs.forEach((price) => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    };
                });
            });
            setProducts(products);
        });
    }, [])

    console.log(products);

    const loadCheckout = async (priceId) => {
        const docRef = await db.collection("customers")
        .doc(user.uid).collection("checkout_sessions")
        .add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });

        docRef.onSnapshot(async(snap) => {
            const { error, sessionId } = snap.data();

            if (error) {
                alert(`An error occured: ${error.message}`);
            }

            if (sessionId) {
                const stripe = await loadStripe(
                    "pk_live_51OV03PA5tRvT4bBk0KVdfbK39aSKXCYIj1uUaJhmDiuYLcaDKPgznGV0UISdN3a0IYyIO7Lv0RaVTS6JZZ1Adm4u00m83jFDZH"
                );

                stripe.redirectToCheckout({ sessionId });
            }
        });
    };

    return (
        <div className = "plansScreen">
            {Object.entries(products).map(([productId, productData]) => {
                return (
                    <div className = "plansScreen_plan">
                        <div className = "plansScreen_info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>

                        <button onClick = {() => loadCheckout(productData.prices.priceId)}>Subscribe</button>
                    </div>
                );
            })}
        </div>
    );
}

export default PlansScreen;