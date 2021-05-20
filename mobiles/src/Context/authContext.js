import React, {createContext, useState, useEffect, useContext} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthContext = createContext({ signed: true, data: {}});

export const AuthProvider = ({children}) => {

    /*------------ Estados ------------*/
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [carregando, setCarregando] = useState(false)

    /*
        Criei dois estados(error e carregando) para que o usuário saiba se o login está em andamento e se deu algo erro.
        Para ver eles funcionando basta fazer isso{
            setError(false) na linha 42 e setError(true) na linha 65,
            setCarregando(true) na linha 43 e setCarregando(false) na linha 61 e 64,
        }
        Agora enviando o erro/carregando basta colocar os dois dentro do value do AuthContext na linha 84
        e você receberá os dois na página Client/SignIn.js
    */

    /*------------ Estados ------------*/

    useEffect(()=>{
        async function LoadStorageData(){
            const storagedata = await AsyncStorage.getItem('@RNAuth:data');
            const storageToken = await AsyncStorage.getItem('@RNAuth:token');

            if(storagedata && storageToken){
                setData(JSON.parse(storagedata));
                setLoading(false)
            } setLoading(false)//para o caso a pessoa deslogue, o icone de carregar irá sumir
        }
        LoadStorageData();
    },[])

    /************* Logar *************/
        async function signIn(codeAccess){
            setError(false)
            setCarregando(true)

            fetch('https://crunchyroll-server.herokuapp.com/PwbsOs9YtfLi85clN8Sz',{
                method:'post',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    codeAccess:codeAccess
                })
            })
            .then(res => res.json())
            .then(async(res) =>{
                res.error != 'fail'
                    ?
                await AsyncStorage.setItem('@RNAuth:data', JSON.stringify(res.user)) |
                await AsyncStorage.setItem('@RNAuth:token', res.token)|
                setCarregando(false)|
                setData(res.user)
                    :
                setCarregando(false)
                setError(true)
            })
        }

        /*
            Peguei o nome e o pass e joguei elas na linha 40 e 41.
            Esse res.error na linha 57 é o tipo de erro que configurei na minha api
        */

    /************* Logar *************/

    /************* Deslogar *************/
        function signOut(){
            AsyncStorage.clear().then(()=>{
                setData(null)
                setLoading(false)//para a tela de carregamento sumir logo após o logout
            })
        }
    /************* Deslogar *************/

    return(
        <AuthContext.Provider value={{ signed: !!data, data, loading, signIn, signOut, error ,carregando }}>
            {children}
        </AuthContext.Provider>
    )
};

// export default AuthContext;

export function myHooksContext(){
    const context = useContext(AuthContext)

    return context;
}