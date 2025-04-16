

//Reparar la ruta y ponerla con el name de la db

interface Props {
    params: {
        usuario: string;
    };
}


function PerfilUser ({ params }: Props) {

    const { usuario } = params;

  return (
    <div>
      <h1>Hello Page {usuario} </h1>
    </div>
  );
}

export default PerfilUser;