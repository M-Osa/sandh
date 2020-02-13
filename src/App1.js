import React from 'react';
import './App.css';


const AccountNameProp = ({account}) => {
    console.log('      rendering ChildProp')
    return (<div>child: {account.name}</div>)
}

function App() {
    const [account, setAccount] = React.useState({name: 'name', id: 1, numberOfAppointments: 0})
    console.log('--------------------------------------------')
    console.log('rendering App')
    return (
        <div className="App">
            <AccountNameProp account={account}/>
                <GrandParent preference={preference} uselessVar={uselessVar}/>
                <hr/>
                <PureGrandParent preference={preference} uselessVar={uselessVar}/>
                <button onClick={() => {
                    console.log('**updating account name to ', account.name + '1');
                    setAccount({...account, name: account.name + '1'})
                }}>
                    update name in account
                </button>
                <button onClick={() => {
                    console.log('**updating account extra to ', account.extra + 1);
                    setAccount({...account, extra: account.extra + 1})
                }}>
                    update useless in account
                </button>
                <button onClick={() => {
                    console.log('**updating preference to ', preference + '2');
                    setPreference(preference + '2')
                }}>
                    update preference
                </button>
                <button onClick={() => {
                    console.log('**updating uselessVar to ', uselessVar + '3');
                    setUselessVar(uselessVar + '3')
                }}>
                    update nothing
                </button>
            </AccountContext.Provider>
        </div>
    );
}

export default App;
