const express = require('express');
const mysql = require('mysql');

//Crear conexion
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'nodeConMysql'
});

//Conectarse
db.connect((err) => {
	if(err) {
		throw err;
	}
	console.log("Conectado con mysql..");
});

//app representa el servidor.
const app = express();
app.get('/creardb', (req,res) => {

	let sql = 'CREATE DATABASE nodeConMysql';
	db.query(sql,(err,result) => {
		if(err) {
			throw err;
		}
		console.log(result);
		res.send('BD Creada!');
	});
});

//Crear tabla
app.get('/createpoststable',(req,res) => {
	let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255), PRIMARY KEY (id))';
	db.query(sql, (err,result) => {
		if(err) {
			throw err;
		}
		console.log(result);
		res.send("Tabla creada");
	});
});

//Agregar post 1
app.get('/addpost1', (req,res) => {
	let post = {title: 'Post uno',body: 'Este es primer post'};
	let sql = 'INSERT INTO posts SET ?';
	let query = db.query(sql,post,(err,result) => {
		if(err) {
			throw err;
		}
		console.log(result);
		res.send("Post creado");
	});
});

//Agregar post 2
app.get('/addpost2', (req,res) => {
	let post = {title: 'Post dos',body: 'Este es segundo post'};
	let sql = 'INSERT INTO posts SET ?';
	let query = db.query(sql,post,(err,result) => {
		if(err) {
			throw err;
		}
		console.log(result);
		res.send("Post creado");
	});
});

//Seleccionar los posts en db y traerlos (results seria param ostrar datos)
app.get('/getposts', (req,res) => {
	
	let sql = 'SELECT * FROM posts';
	let query = db.query(sql,(err,result) => {
		if(err) {
			throw err;
		}
		console.log(result);
		res.send("Posts seleccionados..");
	});
});

//Seleccionar un solo post por requerimiento
app.get('/getpost/:id', (req,res) => {
	
	let sql = `SELECT * FROM posts WHERE id= ${req.params.id}`;
	let query = db.query(sql,(err,result) => {
		if(err) {
			throw err;
		}
		console.log(result);
		res.send("Post único seleccionado..");
	});
});

//Actualizar un post (titulo en este caso)
app.get('/updatepost/:id', (req,res) => {
	let newTitle = "Titulo actualizado";
	let sql = `UPDATE posts SET title='${newTitle}' WHERE id= ${req.params.id}`;
	let query = db.query(sql,(err,result) => {
		if(err) {
			throw err;
		}
		console.log(result);
		res.send("Post actualizado..");
	});
});

//Borrar post
app.get('/deletepost/:id', (req,res) => {
	let sql = `DELETE FROM posts WHERE id= ${req.params.id}`;
	let query = db.query(sql,(err,result) => {
		if(err) {
			throw err;
		}
		console.log(result);
		res.send("Post borrado..");
	});
});

app.listen('3000',() => {
	console.log("funcando...");
});