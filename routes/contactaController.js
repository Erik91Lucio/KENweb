var email = require('nodemailer'); //libreria para enviar mails
exports.index = function(req, res, next) {
	res.render('contacta/index', {title: 'KEN'});
};

//funcion que se encarga de enviar los correos
exports.enviar = function(req, res, next) {
	var nombre = req.body.nombre;
	var correo = req.body.email;
	var telf = req.body.telefono;
	var pregunta = req.body.pregunta;
	//if(nombre==""|| correo=="" || pregunta==""){
		//req.flash....
		//redirigir a donde estaba
		next(); //esta linea sobra cuando ya se haya redirigido
	//} else {
		var smtpTransport = email.createTransport("SMTP", {
			service: "Gmail",
			auth: {
				user: "webyandroid@gmail.com",
				pass: 
			}
		});

		var mailOptions1 = {
			from: "KEN <webyandroid@gmail.com>",
			to: req.body.email,
			subject: "KEN informa",
			text: "Hola "+ req.body.nombre + ". \nSu consulta ha sido registrada. Le responderemos lo antes posible."
		}

		var mailOptions2 = {
			from: "Cliente",
			to: "webyandroid@gmail.com",
			subject: "Consulta",
			text: "\nNombre: " + req.body.nombre +  "\n E-mail: " + req.body.email + "\n Teléfono: " + req.body.telefono + "\n Consulta: " + req.body.pregunta
		}

		smtpTransport.sendMail(mailOptions1, function(error, response){
			if(error){
				next('Pregunta no enviada');
			} else {
				smtpTransport.sendMail(mailOptions2, function(error, response){
					if(error){
						next('Pregunta no enviada');
					} else {
						res.render('contacta/index', {title: 'KEN'});
					}
				});	
			
			}
		});
	//}
}