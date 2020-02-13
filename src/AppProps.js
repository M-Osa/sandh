import React from 'react';
import './App.css';

const AccountNameProp = ({account}) => {
    console.log('      rendering AccountNameProp')
    return (<div>prop: {account.name}</div>)
}

const AccountNamePureProp = React.memo(({account}) => {
    console.log('      rendering AccountNamePureProp')
    return (<div>pure prop: {account.name}</div>)
})

const AccountNameVeryPureProp = React.memo(({account}) => {
    console.log('      rendering AccountNameVeryPureProp')
    return <div>very pure prop: {account.name}</div>
},(prev, next)=> prev.account.name === next.account.name)

function App() {
    const [account, setAccount] = React.useState({id: 1, name: 'name', numberOfAppointments: 0})
    const [preference, setPreference] = React.useState('pref')
    console.log('--------------------------------------------')
    console.log('rendering App')
    return (
        <div className="App">
            <AccountNameProp account={account}/>
            <AccountNamePureProp account={account}/>
            <AccountNameVeryPureProp account={account}/>
            <button onClick={() => {
                console.log('**updating account name to ', account.name + '1');
                setAccount({...account, name: account.name + '1'})
            }}>
                update name in account
            </button>
            <button onClick={() => {
                console.log('**updating account numberOfAppointments to ', account.numberOfAppointments + 1);
                setAccount({...account, numberOfAppointments: account.numberOfAppointments + 1})
            }}>
                update number of appts in account
            </button>
            <button onClick={() => {
                console.log('**updating preference to ', preference + '2');
                setPreference(preference + '2')
            }}>
                update preference
            </button>
        </div>
    );
}

export default App;