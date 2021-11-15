import Head from './Head';

import Style from './Style';

const Layout = ({ children, title, description, url, image }) => ( 
    <div>
        <Head
            title={title} 
            description={description}
            url={url}
            ogImage={image}></Head>
        <Style />
        <div className="body">
            {children}
        </div>
        <footer>
            <div className="flex flex-center">
                <small>
                    &copy; Loja Sid Surf Store
                </small>
            </div>
        </footer>
    </div>
);

export default Layout;