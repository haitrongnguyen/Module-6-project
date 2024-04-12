import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as service from "../service/ProductServie"
import swal from 'sweetalert';
import './style.css'
import Swal from "sweetalert2";

const Paypal = (props) => {
    const paypal = useRef();
    const id = props.data.id;
    const amount = props.data.amount;
    const navigate = useNavigate()
    const accessToken = sessionStorage.getItem('accessToken')
    const [paypalRendered, setPaypalRendered] = useState(false);
    useEffect(() => {

        window.paypal
            .Buttons({
                createOrder: function (data, actions) {
                    return actions.order.create({
                        purchase_units: [{ "amount": { "currency_code": "USD", "value": amount } }]
                    });
                },
                onApprove: async (data, actions) => {
                    console.log(id, amount, accessToken);
                    await service.handleSuccess(id, amount, accessToken);
                    navigate(`/history`)
                    // swal({
                    //     title: "Notification",
                    //     text: "You have successfully paid!",
                    //     type: "success",
                    //     icon: "success",
                    //     confirmButtonText: 'OK', // Thay đổi văn bản của nút OK
                    //     customClass: {
                    //         confirmButton: 'my-swal-confirmButton' // Thêm class cho nút OK
                    //     }
                    // });
                    Swal.fire({
                        title: 'Notification',
                        text: 'You have successfully paid!',
                        icon: 'success',
                        confirmButtonColor: '#3085d6', // Thay đổi màu sắc nút OK
                        confirmButtonText: 'OK', // Thay đổi văn bản của nút OK
                        customClass: {
                            confirmButton: 'my-swal-confirmButton' // Thêm class cho nút OK
                        }
                    })
                },
                onError: async (err) => {
                    // navigate("/user/information")
                    console.log(err);
                },
                style: {
                    layout: 'horizontal',
                    color: 'gold',
                    shape: 'rect',
                    label: 'paypal',
                    height: 40,
                    with: 1170

                },
                funding: {
                    disallowed: [window.paypal.FUNDING.CARD, window.paypal.FUNDING.CREDIT]
                }
            })
            .render(paypal.current);
    }, []);

    return (
        <div>
            <div ref={paypal}></div>
        </div>

    );
};

export default Paypal;