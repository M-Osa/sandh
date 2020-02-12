import React from 'react';
import './App.css';

const AccountContext = React.createContext()
const useAccount = () => React.useContext(AccountContext)


const ChildHook = () => {
    const account = useAccount()
    console.log('      rendering ChildHook')
    return (<div>hook: {account.name}</div>)

}

const PureChildHook = React.memo(() => {
    const account = useAccount()
    console.log('      rendering PureChildHook')
    return (<div>pure hook: {account.name}</div>)

})

const VeryPureChildHook = () => {
    const account = useAccount()

    return React.useMemo(() => {
            console.log('      rendering VeryPureChildHook')
            return <div>very pure hook: {account.name}</div>
        }
        , [account.name])
}

const ChildProp = ({account}) => {
    console.log('      rendering ChildProp')
    return (<div>child: {account.name}</div>)
}


const PureChildProp = React.memo(({account}) => {
    console.log('      rendering PureChildProp')
    return (<div>pure child: {account.name}</div>)
})

const VeryPureChildProp = React.memo(({account}) => {
            console.log('      rendering VeryPureChildProp')
            return <div>very pure child: {account.name}</div>
},(prev, next)=> prev.account.name === next.account.name)


const ParentComponent = () => {
    const account = useAccount()
    console.log('    rendering ParentComponent')
    return (
        <>
            <ChildHook/>
            <PureChildHook/>
            <VeryPureChildHook/>

            <ChildProp account={account}/>
            <PureChildProp account={account}/>
            <VeryPureChildProp account={account}/>
        </>
    )
}


// shouldComponentNOTUpdate
const areEqualPreference = (prevProps, nextProps) => {
    return prevProps.preference === nextProps.preference
}

const PureGrandParent = React.memo(({preference}) => {
    console.log('  rendering Pure GrandParent')
    return <div className='grand-parent'>
        <p>Pure GrandParent:</p>
        <ParentComponent preference={preference}/>
    </div>
}, areEqualPreference)


const GrandParent = ({preference}) => {
    console.log('  rendering GrandParent')
    return <div className='grand-parent'>
        <p>GrandParent:</p>
        <ParentComponent preference={preference}/>
    </div>
}


function App() {
    const [account, setAccount] = React.useState({name: 'name', id: 1, extra: 0})
    const [preference, setPreference] = React.useState('pref')
    const [uselessVar, setUselessVar] = React.useState('useless')
    console.log('--------------------------------------------')
    console.log('rendering App')
    return (
        <div className="App">
            <AccountContext.Provider value={account}>
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
