import React from 'react';
import './App.css';

const AccountContext = React.createContext()
const useAccount = () => React.useContext(AccountContext)


const AccountNameHook = () => {
    const account = useAccount()
    console.log('      rendering AccountNameHook')
    return (<div>hook: {account.name}</div>)

}

const AccountNamePureHook = React.memo(() => {
    const account = useAccount()
    console.log('      rendering AccountNamePureHook')
    return (<div>pure hook: {account.name}</div>)

})

const AccountNameVeryPureHook = () => {
    const account = useAccount()

    return React.useMemo(() => {
            console.log('      rendering AccountNameVeryPureHook')
            return <div>very pure hook: {account.name}</div>
        }
        , [account.name])
}

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


const Account = () => {
    const account = useAccount()
    console.log('    rendering Account')
    return (
        <>
            <AccountNameHook/>
            <AccountNamePureHook/>
            <AccountNameVeryPureHook/>

            <AccountNameProp account={account}/>
            <AccountNamePureProp account={account}/>
            <AccountNameVeryPureProp account={account}/>
        </>
    )
}


// shouldComponentNOTUpdate
const areEqualPreference = (prevProps, nextProps) => {
    return prevProps.preference === nextProps.preference
}

const PureContainerComponent = React.memo(({preference}) => {
    console.log('  rendering Pure ContainerComponent')
    return <div className='grand-parent'>
        <p>Pure ContainerComponent:</p>
        <Account preference={preference}/>
    </div>
}, areEqualPreference)


const ContainerComponent = ({preference}) => {
    console.log('  rendering ContainerComponent')
    return <div className='grand-parent'>
        <p>ContainerComponent:</p>
        <Account preference={preference}/>
    </div>
}


function App() {
    const [account, setAccount] = React.useState({id: 1, name: 'name', numberOfAppointments: 0})
    const [preference, setPreference] = React.useState('pref')
    const [appointments, setAppointments] = React.useState('appointments')
    console.log('--------------------------------------------')
    console.log('rendering App')
    return (
        <div className="App">
            <AccountContext.Provider value={account}>
                <ContainerComponent preference={preference} appointments={appointments}/>
                <hr/>
                <PureContainerComponent preference={preference} appointments={appointments}/>
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
                <button onClick={() => {
                    console.log('**updating appointments to ', appointments + '3');
                    setAppointments(appointments + '3')
                }}>
                    update appointments
                </button>
            </AccountContext.Provider>
        </div>
    );
}

export default App;
