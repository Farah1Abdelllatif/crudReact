const express = require ("express");
const cors = require("cors");
const mysql = require ("mysql");
const app = express();
app.use(express.json());
app.use(cors());

const db=mysql.createConnection({
    host:"localhost",
    user: "root" ,
    password: "",
    database: "crud"
})

app.get("/",(req,res)=>{
    const sql = "select * from student";
    db.query(sql,(err,data)=>{
        if (err) return res.json("error");
        return res.json(data);
    })
})

app.post('/create', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO student (Name, Email) VALUES (?, ?)';
  
    db.query(sql, [name, email], (err, result) => {
      if (err) {
        console.error('Erreur de base de données:', err);
        return res.status(500).json({ error: 'Erreur de base de données' });
      }
      console.log('Nouvel étudiant inséré avec succès');
      return res.status(200).json({ message: 'Étudiant ajouté avec succès' });
    });
  });

  
  app.put('/update/:id', (req, res) => {
    const { name, email } = req.body;
    const sql = "UPDATE student SET Name=?, Email=? WHERE ID=?";
    const id = req.params.id;
    db.query(sql, [name, email, id], (err, result) => {
        if (err) {
            console.error('Erreur de base de données:', err);
            return res.status(500).json({ error: 'Erreur de base de données' });
        }
        console.log('Étudiant mis à jour avec succès');
        return res.status(200).json({ message: 'Étudiant mis à jour avec succès' });
    });
});


app.delete('/student/:id', (req, res) => {
  const sql = "DELETE FROM student WHERE ID=?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
      if (err) {
          console.error('Erreur de base de données:', err);
          return res.status(500).json({ error: 'Erreur de base de données' });
      }
      console.log('Étudiant supprimé avec succès');
      return res.status(200).json({ message: 'Étudiant supprimé avec succès' });
  });
});

app.get('/student/:id', (req, res) => {
  const sql = "SELECT * FROM student WHERE ID=?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erreur de base de données:', err);
      return res.status(500).json({ error: 'Erreur de base de données' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Étudiant non trouvé' });
    }
    const student = result[0]; // Récupérer le premier (et unique) résultat
    return res.status(200).json(student);
  });
});


app.listen(8081,()=>{
console.log("Listening");
})
