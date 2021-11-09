import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
//Reactive Variables 사용 --> RV: prop을 사용하지않고 Component 사이에 데이터 공유하는 방식

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


export const client = new ApolloClient({
    uri:"http://localhost:4000/graphql",
    cache: new InMemoryCache()
});
//ApolloClient 백엔드와 다리 역할 --> 얘를 세팅해야 데이터 주고받기가 가능해짐
//cache: Apollo가 한번 가져온 정보를 기억해서 다시 안가져와도 되게 도와줌
