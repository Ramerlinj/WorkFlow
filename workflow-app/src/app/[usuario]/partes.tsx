// src/app/[usuario]/page.tsx

import { User } from './interfaces';

const UserPage = async ({ params }: { params: { usuario: string } }) => {
  // Usamos `fetch` para obtener los datos
  const response = await fetch(`http://localhost:5000/user/${params.usuario}`);
  const user: User = await response.json();

  if (!user) {
    return <p>Usuario no encontrado</p>;
  }

  // Asegurarnos de que `profile` esté definido antes de acceder a sus propiedades
  const userProfile = user.profile || {};

  // Asegurarnos de que `user_config` esté definido antes de acceder a sus propiedades
  const userConfig = user.user_config || {};

  // Asignar valores predeterminados si los datos no están disponibles
  const skills = user.skills || [];
  const links = user.links || [];
  const workExperience = user.work_experience || [];

  return (
    <div>
      <h1>Perfil de {user.first_name} {user.first_surname}</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Fecha de nacimiento: {user.date_of_birth}</p>
      <p>Fecha de creación: {user.creation_date}</p>

      <h2>Sobre mí:</h2>
      <p>{userProfile.about_me || "No se ha proporcionado información sobre mí."}</p>

      <h3>Habilidades:</h3>
      <ul>
        {skills.length === 0 ? (
          <p>No tiene habilidades registradas.</p>
        ) : (
          skills.map((skill) => (
            <li key={skill.id_skill}>{skill.nombre}</li>
          ))
        )}
      </ul>

      <h3>Enlaces:</h3>
      <ul>
        {links.length === 0 ? (
          <p>No tiene enlaces registrados.</p>
        ) : (
          links.map((link) => (
            <li key={link.id_links}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.name}
              </a>
            </li>
          ))
        )}
      </ul>

      <h3>Experiencia laboral:</h3>
      {workExperience.length === 0 ? (
        <p>No tiene experiencia laboral registrada.</p>
      ) : (
        <ul>
          {workExperience.map((experience) => (
            <li key={experience.id_experience}>
              <strong>{experience.title}</strong> en {experience.company}
              <p>{experience.description}</p>
              <p>Desde: {experience.start_date} {experience.end_date ? `Hasta: ${experience.end_date}` : 'Actualmente'}</p>
            </li>
          ))}
        </ul>
      )}

      <h3>Configuración de usuario:</h3>
      <ul>
        {/* Comprobamos si `userConfig` existe antes de acceder a las propiedades */}
        <li>Perfil público: {userConfig.public_profile ? 'Sí' : 'No'}</li>
        <li>Notificación por correo: {userConfig.notification_by_mail ? 'Sí' : 'No'}</li>
        <li>Alertas de empleo: {userConfig.job_alert ? 'Sí' : 'No'}</li>
        <li>Idioma: {userConfig.language}</li>
      </ul>
    </div>
  );
};

export default UserPage;
