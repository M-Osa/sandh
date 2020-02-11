import React from 'react';
import './App.css';

function sleepFor(sleepDuration) {
    var now = new Date().getTime();
    while (new Date().getTime() < now + sleepDuration) { /* do nothing */
    }
}

const AccountContext = React.createContext()
const useAccount = () => React.useContext(AccountContext)


const ChildHook = () => {
    const account = useAccount()
    console.log('      rendering ChildHook')
    sleepFor(5)
    return (<div>hook: {account.name}</div>)

}

const PureChildHook = React.memo(() => {
    const account = useAccount()
    console.log('      rendering PureChildHook')
    sleepFor(5)
    return (<div>pure hook: {account.name}</div>)

})

const VeryPureChildHook = () => {
    const account = useAccount()

    return React.useMemo(() => {
            console.log('      rendering VeryPureChildHook')
            sleepFor(5)
            return <div>very pure hook: {account.name}</div>
        }
        , [account.name])
}

const ChildProp = ({account}) => {
    console.log('      rendering ChildProp')
    sleepFor(5)
    return (<div>child: {account.name}</div>)
}


const PureChildProp = React.memo(({account}) => {
    console.log('      rendering PureChildProp')
    sleepFor(5)
    return (<div>pure child: {account.name}</div>)
})

const VeryPureChildProp = ({account}) => {
    return React.useMemo(() => {
            console.log('      rendering VeryPureChildProp')
            sleepFor(5)
            return <div>very pure child: {account.name}</div>
        }
        , [account.name])
}


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
const areEqual = (prevProps, nextProps) => {
    return prevProps.preference === nextProps.preference
}

const MemoizedUselessComponent = React.memo(({preference}) => {
    console.log('  rendering MemoizedUselessComponent')
    return <div className='useless-component'>
        <p>MemoizedUselessComponent:</p>
        <ParentComponent preference={preference}/>
    </div>
}, areEqual)


const UselessComponent = ({preference}) => {
    console.log('  rendering UselessComponent')
    return <div className='useless-component'>
        <p>UselessComponent:</p>
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
                <UselessComponent preference={preference} uselessVar={uselessVar}/>
                <hr/>
                <MemoizedUselessComponent preference={preference} uselessVar={uselessVar}/>
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
