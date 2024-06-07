import React from 'react';

const appNode = createRoot(document.getElementById('ReadingList'));

const Root = () => {
    return(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    )
}
appNode.render(<Root />);
