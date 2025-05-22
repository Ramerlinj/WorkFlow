import ItemsFooter from "./itemFooter";

const Footer = () => {
    return (
        <footer className="bg-default-300 text-muted">
            <div className="">
                <div className="">
                    <ItemsFooter />
                </div>
                <hr className="mt-10 mx-10" />
                <div className="fex justify-center items-center py-8">
                    <p className="text-center text-muted">© WorkFlow. Todos los derechos reservados</p>
                </div>
            </div>
        </footer>
    )
}


export default Footer
