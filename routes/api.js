
var pag = require('../config/pagseguroConfig');

module.exports = function (app) { 
    
    // POST

   app.post('/api/checkOut', function(req, res) {

        //Configurando as informações do comprador
        pag.pagCart.buyer({
            name: 'Emerson jose',
            email: 'comprador@uol.com.br',
            phoneAreaCode: '51',
            phoneNumber: '12345678'
        });

        //Configurando a entrega do pedido
        pag.pagCart.shipping({
            type: 1,
            street: 'Rua Alameda dos Anjos',
            number: '367',
            complement: 'Apto 307',
            district: 'Parque da Lagoa',
            postalCode: '01452002',
            city: 'São Paulo',
            state: 'RS',
            country: 'BRA'
        });

    	//Adicionar os produtos no carrinho do pagseguro
        req.body.forEach(function (item, i) {
    		pag.pagCart.addItem({
    	        id: item.id,
    	        description: item.name,
    	        amount: item.price,
    	        quantity: 1,
    	        weight: 10.1
    	    });
    	});

        //Enviando o xml ao pagseguro
        pag.pagCart.send(function(err, res) {
            if (err) {
                console.log(err);
            }
            console.log(res);
        });

        res.send({ sucesso: true });

    });

}

