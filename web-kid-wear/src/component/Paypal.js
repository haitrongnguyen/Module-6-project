import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as service from "../service/ProductServie"
import swal from 'sweetalert';

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
                    navigate(`/`)
                    swal({
                        title: "Thông báo",
                        text: "Bạn đã thanh toán thành công!",
                        type: "success",
                        icon: "success",
                        button: {
                            text: "OK",
                        },
                    });
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