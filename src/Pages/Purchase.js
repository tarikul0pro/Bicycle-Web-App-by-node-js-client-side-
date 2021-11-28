import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import useAuth from '../hooks/useAuth.js';

const Purchase = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const { bicycleId } = useParams();
    const [bicycle, setbicycle] = useState({})
    const { user } = useAuth()
    const history = useHistory()


    const onSubmit = (data) => {
        data.email = user?.email;

        fetch("https://nameless-badlands-61718.herokuapp.com/addOrders", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.insertedId) {
                    history.push('/dashboard')
                }
            });


    };


    useEffect(() => {
        fetch(`https://nameless-badlands-61718.herokuapp.com/product/${bicycleId}`)
            .then(res => res.json())

            .then(data => setbicycle(data));

    }, [bicycleId])

    return (
        <div className="details-container">

            <div className="row container">
                <div className="col-md-6">
                    <img src={bicycle.img} alt="" />
                    <h1>{bicycle.name}</h1>
                    <h1>{bicycle.price}</h1>


                </div>
                <div className="col-md-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register("name")}
                            placeholder="Name"
                            defaultValue={bicycle?.name}
                            className="p-2 m-2 w-100 input-field"
                        />

                        <input
                            {...register("description")}
                            defaultValue={bicycle?.description}
                            placeholder="Description"
                            className="p-2 m-2 w-100 input-field"
                        />

                        <input
                            {...register("image", { required: true })}
                            placeholder="Image Link"
                            defaultValue={bicycle?.img}
                            className="p-2 m-2 w-100 input-field"
                        />

                        <input
                            {...register("price", { required: true })}
                            placeholder="Price"
                            defaultValue={bicycle?.price}
                            type="number"
                            className="p-2 m-2 w-100 input-field"
                        />

                        <select {...register("model")} className="p-2 m-2 w-100">
                            <option value="premium">premium</option>
                            <option value="classic">classic</option>
                            <option value="business">business</option>
                        </select>
                        <br />

                        {errors.exampleRequired && <span>This field is required</span>}

                        <input
                            type="submit"
                            value="Order now"
                            className="btn btn-info w-50"
                        />
                    </form>
                </div>
            </div>


        </div>
    );
};

export default Purchase;