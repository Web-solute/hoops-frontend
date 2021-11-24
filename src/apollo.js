/* eslint-disable */
import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {createUploadLink} from "apollo-upload-client";

const TOKEN = "token";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const logUserIn = (token) => {
    localStorage.setItem(TOKEN,token);
    isLoggedInVar(true);
}
export const logUserOut = () => {
    localStorage.removeItem(TOKEN);
    window.location.reload();
}

const authLink = setContext((_,{headers}) => {
    return {
        headers: {
            ...headers,
            token:localStorage.getItem(TOKEN)
        }
    }
})

export const client = new ApolloClient({
    link: authLink.concat(createUploadLink({
        uri:"http://localhost:4000/graphql"
    })),
    cache: new InMemoryCache()
});
//ApolloClient 백엔드와 다리 역할 --> 얘를 세팅해야 데이터 주고받기가 가능해짐
//cache: Apollo가 한번 가져온 정보를 기억해서 다시 안가져와도 되게 도와줌
