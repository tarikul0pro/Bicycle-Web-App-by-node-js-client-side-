import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth.js';

const MyBooking = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);

    console.log(user);
    useEffect(() => {
        fetch(`https://nameless-badlands-61718.herokuapp.com/myOrders/${user?.email}`)
            .then(res => res.json())
            .then(data => setBookings(data))

    }, [user?.email])
    console.log(bookings);
    return (
        <div>
            <h1>{bookings.length}</h1>
            <div className="row">
                {
                    bookings.map(booking => {
                        <div>
                        <h2>{booking?._id}</h2>
                        <h2>{booking?.email}</h2>
                        <h2>{booking?.name}</h2>

                    </div>



                    }


                    )
                }
            </div>
        </div>
    );
};

export default MyBooking;