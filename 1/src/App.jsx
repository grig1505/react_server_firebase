import { useEffect, useState } from 'react';

function App (){
    const [tdlist, setTdlist] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        fetch('https://mocki.io/v1/042cc3ee-7a47-4404-ac11-a1b1a6774c3b')
            .then((loadedData) => loadedData.json())
            .then((loadedTdlist) => {
				setTdlist(loadedTdlist);
				//console.log('tdlist', loadedTdlist);
            })
            .finally(() => setIsLoading(false));
    }, []);


    return (
		<div className="container">
		<div className="list">
			<h1>Список задач</h1>
            {isLoading ? (
                <div className="loader"></div>
            ) : (
                tdlist.map(({ id, title, body }) => (
                    <div className='list-item' key={id}>
                        {title} - {body}
                    </div>
                ))
            )}
        </div>
        </div>
    );
};
export default App;
