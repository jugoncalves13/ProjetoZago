import {View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from "@react-navigation/native";

export default function Busca() {
    const[ clientes, setClientes ] = useState([]);
    const[ error, setError ] = useState(false);
    const[ edicao, setEdicao] = useState(false);
    const[ clientId, setClientId ] = useState(0);
    const[ clientNome, setClientNome] = useState();
    const[ clientEmail, setEmail ] = useState();
    const[ clientSenha, setSenha ] = useState();
    const[ deleteResposta, setResposta ] = useState(false);

    async function getClientes () {
        await fetch('http://10.139.75.14:5251/api/Clients/GetAllClients' , {
            method: 'GET',
            headers: {
                'content-type' : 'application/json'
            }           
        })
        .then( res => res.json())        
        .then(json => setClientes( json ))
        .catch(err => setError(true))
    }

    async function getCliente(id) {
        await fetch('http://10.139.75.14:5251/api/Clients/GetClientId/' + id, {
            method: 'GET',
            headers: {
                'content-type' : 'application/json; charset=UTF=8',
            },
        })
        .then((response) => response.json())
        .then(json => {
            setClientId(json.clientId);
            setClientNome(json.clientName);
            setEmail(json.clientEmail);
            setSenha(json.clientPassword);
        });
    }

    async function editClient() {
        console.log(clientId, clientEmail, clientSenha, clientNome);
        await fetch('http://10.139.75.14:5251/api/Clients/UpdateClients/' + clientId, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                clientId: clientId,
                clientEmail: clientEmail,
                clientPassword: clientSenha,
                clientName: clientNome
            })
        })
        .then((response) => response.json())
        .catch( err => console.log( err ) );
        getClientes();
        setEdicao(false);
    }

    function showAlert(id, clientName){
        Alert.alert(
            '',
            'Deseja realmente excluir esse usuário?',
            [
                {text: 'Sim', onPress: () => deleteClient(id, clientName)},
                {text: 'Não', onPress: () =>('')},
            ],
            {cancelable: false }
        );
    }

    async function deleteClient(id, clientName){
        await fetch('http://10.139.75.14:5251/api/Clients/DeleteClients/' + id, {
            method: 'DELETE',
            headers: {
                'Content-type' : 'application/json; charset=UTF-8',
            },
        })
        .then(rs => res.json())
        .then(json => setResposta(json))
        .catch( err => setError(true))

        if(deleteResposta == true)
        {
            Alert.alert(
                '',
                'Cliente' + clientName + 'excluido com sucesso',
                [
                    {text: '', onPress: () =>('')},
                    {text: 'Ok', onPress: () =>('')},
                ],
                {cancelable: false }
            );
            getClientes();
        }
        else
        {
            Alert.alert(
                '',
                'Cliente' + clientName + 'não foi excluido',
                [
                    {text: '', onPress: () =>('')},
                    {text: 'Ok', onPress: () =>('')},
                ],
                {cancelable: false }
            );
            getClientes();
        }
    };


    useEffect( () => {
        getClientes();
    }, [] );

    useFocusEffect(
        React.useCallback(() => {
            getClientes();
        }, [])
    );

    return(
        <View style={css.container}>
            {edicao == false ?
            <FlatList
            style={css.flat}
            data={clientes}
            keyExtractor={(item) => item.clientId}
            renderItem={({ item }) => (
                <Text style={css.text}>
                    {item.clientName}
                    <TouchableOpacity style={css.btnEdit} onPress={() => { setEdicao(true); getCliente(item.clientId) }}>
                        <Text style={css.btnTextEditar}>EDITAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={css.btnDelete} onPress={() => showAlert(item.clientId, item.clientName)}>
                        <Text style={css.btnText}>EXCLUIR</Text>
                    </TouchableOpacity>
                </Text>
            )}
            />
            :
      <View style={css.editar}>
                <TextInput
                inputMode="text"
                style={css.input}
                value={clientNome}
                onChangeText={(digitado) => setClientNome(digitado)}
                placeholderTextColor="black"               
                />
                <TextInput
                inputMode="email"
                style={css.input}
                value={clientEmail}
                onChangeText={(digitado) => setEmail(digitado)}
                placeholderTextColor="black"               
                />
                <TextInput
                inputMode="text"
                style={css.input}
                value={clientSenha}
                onChangeText={(digitado) => setSenha(digitado)}
                placeholderTextColor="black"               
                />
                <TouchableOpacity style={css.btnCreate} onPress={() => editClient()}>
                    <Text style={css.btnText}>SALVAR</Text>
                </TouchableOpacity>
            </View>
             }
            </View>
               )}
const css = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: "100%",
        alignItems: "center",
        backgroundColor: "#191919",
    },
    text: {
        color: "white"
    },
    input: {
        width: "90%",
        height: 50,
        borderRadius: 10,
        marginBottom: 15,
        padding: 15,
        backgroundColor: "#262626",
        color: "white"
    },
    btnEdit: {
        width: "90%",
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 30,
        backgroundColor: "#1E90FF"
    },
    btnDelete: {
        width: "90%",
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 30,
        backgroundColor: "#DC143C"
    },
    btnCreate: {
        width: "90%",
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 30,
        backgroundColor: "#7B68EE"
    },
    btnText: {
        fontSize: 15,
        lineHeight: 30,
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    btnTextEditar: {
        fontSize: 15,
        lineHeight: 30,
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
    
})