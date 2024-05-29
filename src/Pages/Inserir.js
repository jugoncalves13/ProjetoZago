import {Text, StyleSheet,  ScrollView, TextInput, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'

export default function Inserir() {

  const [nome, setNome ] = useState( "" );
  const [sobrenome, setSobrenome ] = useState( "" );
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [numero, setNumero] = useState("");
  const [rua, setRua] = useState("");
  const [cep, setCep] = useState("");
  const [usuario, setUsuario] = useState("");
  const [cidade, setCidade] = useState("");
  const [erro, setErro ] = useState(false);
  const [sucesso, setSucesso ] = useState(false);

  async function Cadastro()
  {
      await fetch('https://fakestoreapi.com/clients' , {
          method: 'POST',
          headers: {
              'content-type' : 'application/json'
          },
          body: JSON.stringify(
              {
                  email: email,
                  username: usuario,
                  password: senha,
                  name:{
                      firstname: nome,
                      lastname: sobrenome
                  },
                  address:{
                      city: cidade,
                      street: rua,
                      number: numero,
                      zipcode: cep,
                  },
                  phone: telefone
              }
              
          )
         
      })
      .then( res => (res.ok == true) ? res.json () : false)
      .then(json =>{
          setSucesso((json.id) ? true : false);
          setErro((json.id) ? false : true);

      } )
      .catch(err => console.log(true))
  }
  return (
    <ScrollView contentContainerStyle={css.container}>
            {sucesso ? 
            <Text style={css.sucessoText}>Obrigado por se cadastrar!</Text>
        : 
        <>
            <TextInput
             placeholder='Nome:'
             placeholderTextColor="black"
             style={css.input}
             onChangeText={(digitado) => setNome(digitado) }
             value={nome}
           
            />
             <TextInput
             placeholder='Sobrenome:'
             placeholderTextColor="black"
             style={css.input}
             onChangeText={(digitado) => setSobrenome(digitado) }
             value={sobrenome}
            />
             <TextInput
            placeholder='Email'
            placeholderTextColor="black"
            onChangeText={(digitado) => setEmail(digitado) }
            value={email}
            style={css.input}
            />
             <TextInput
             placeholder='Telefone:'
             placeholderTextColor="black"
             style={css.input}
             onChangeText={(digitado) => setTelefone(digitado) }
             value={telefone}
            />
             <TextInput
             placeholder='Usuario:'
             placeholderTextColor="black"
             style={css.input}
             onChangeText={(digitado) => setUsuario(digitado) }
             value={usuario}
            />
            <TextInput
             placeholder='Senha'
             placeholderTextColor="black"
             onChangeText={(digitado) => setSenha(digitado) }
             value={senha}
             style={css.input}
            />
            <TextInput
             placeholder='Rua:'
             placeholderTextColor="black"
             style={css.input}
             onChangeText={(digitado) => setRua(digitado) }
             value={rua}
            />
            <TextInput
             placeholder='Número:'
             placeholderTextColor="black"
             style={css.input}
             onChangeText={(digitado) => setNumero(digitado) }
             value={numero}
            />
            <TextInput
             placeholder='Cidade:'
             placeholderTextColor="black"
             style={css.input}
             onChangeText={(digitado) => setCidade(digitado) }
             value={cidade}
            />
            <TextInput
             placeholder='CEP:'
             placeholderTextColor="black"
             style={css.input}
             onChangeText={(digitado) => setCep(digitado) }
             value={cep}
            />
            <TouchableOpacity style={css.btnCadastrar} onPress={Cadastro}>
                <Text style={css.btnText}>CADASTRAR</Text>
            </TouchableOpacity>
            {erro && 
            <View style={css.error} >
                <Text style={css.errorText}>Revise os campos. Tente novamente!</Text>
            </View>
            }
            </> 
        }
        </ScrollView>
        
    )
}
const css = StyleSheet.create({
  container: {
    backgroundColor: "#191919",
    flexGrow: 1,
    color: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white"
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    backgroundColor: "white",
    color:"black"
},
btnCadastrar: {
    width: "80%",
    height: 50,
    backgroundColor: "#E6E6FA",
    borderRadius: 5,
    marginBottom: 10
},
btnText: {
    fontSize: 15,
    lineHeight: 50,
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
},
errorText: {
    color: "white",
    fontWeight: "bold",
},
sucessoText: {
    fontWeight: "bold",
    fontSize: 17
}
})