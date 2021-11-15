import React, { Component } from 'react';

import Layout from '../components/Layout';

import Cabecalho from '../containers/Cabecalho';
import CheckoutContainerFinal from '../containers/Checkout/CheckoutFinal';
import Rodape from '../containers/Rodape';

export default class Checkout extends Component {
    static async getInitialProps({ res }){
        if(res){
            res.writeHead(302, { Location: "/cart" });
            res.end();
        }
        return {};
    }
    
    render() {
        return (
            <Layout title="Ckeckout | LOJA SID SURF STORE">
                <Cabecalho simples
                    title={""} />
                <CheckoutContainerFinal />
                <Rodape />
            </Layout>
        );
    };
};

