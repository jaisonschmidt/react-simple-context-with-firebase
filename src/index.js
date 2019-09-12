import React from 'react';
import ReactDOM from 'react-dom';

import firebase from './firebase';

/*
Fontes:
https://pt-br.reactjs.org/docs/context.html

https://medium.com/reactbrasil/entendendo-a-context-api-do-react-criando-um-componente-de-loading-a84f84007dc7
https://appdividend.com/2018/11/03/react-context-api-tutorial-with-example/
*/

const FirestoreContext = React.createContext(firebase.firestore());

const ComponentePai = () => {
    return (
        <div>
            <h1>Componente pai</h1>
            <ComponenteFilho />
        </div>
    )
}

class ComponenteFilho extends React.Component {
    static contextType = FirestoreContext;

    constructor(){
        super();
        this.firestoreListenner = null;

        this.state = {
            messages: []
        }

    }

    componentDidMount(){
        console.log(this.context);

        const firestore = this.context;

        this.firestoreListenner = firestore
            .collection('chat')
            .orderBy('timestamp', 'asc')
            .onSnapshot(docs => {
                const messages = docs.docs.map(doc => {
                    return { id: doc.id, data: doc.data() };
                });

                this.setState({
                    messages
                });
            });
    }

    componentWillUnmount(){
        this.firestoreListenner();
    }

    render(){        
        return this.state.messages.length === 0
        ? <div>Carregando...</div>
        : <div>{this.state.messages.map( (message, key) => <div key={key}>{message.data.message}</div> )}</div>
    }
}

ReactDOM.render(<ComponentePai />, document.getElementById('root'));
