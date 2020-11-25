# Inside Design

//Captura

## Un juego de Hummus Sapiens

Disponible en: https://sergimol.github.io/Inside-Design/

Página de gestión: https://www.pivotaltracker.com/n/projects/2470812

### GDD:

https://docs.google.com/document/d/1yMrtayUTp4Gg8F9OBfY62ApORQyxJdX7Kd_lLJLypx4

Inside Design
Documento de diseño de videojuego
-  Hummus Sapiens -
Twitter
Versión 2.0 - 23/11/2020

Resumen
Géneros: Rogue-like, top down, shoot’em up
Modos: Un Jugador
Público objetivo: Todos los públicos, al ser un videojuego red cualquier usuario con internet puede acceder a él. No se necesitan conocimientos específicos para jugarlo.
Plataformas: Web
Hitos: 
0 - Propuesta de proyecto - 14/10/2020
1 - Base final del juego y prototipado - 23/11/2020


Descripción
Inside Design es un top down shooter rogue-like en el que se pretende realizar una simulación del proceso de desarrollo de un videojuego. Mientras el jugador avanza por los niveles, tendrá que lidiar con las mecánicas introducidas por los personajes de los desarrolladores.

Logotipo y portada del juego




RESUMEN DE OBJETIVOS, REGLAS Y DINÁMICAS
Como se ha mencionado antes, Inside Design es un Rogue Like, o como más nos gusta llamarlo, un Rigue Loke. Unamuno tenía la nivola y nosotros esto.

A diferencia de Rogue likes como Nuclear Throne, Enter the Gungeon o The Binding of Isaac, en los cuales, al ir superando salas y niveles puedes ir obteniendo recompensas que te mejoran atributos o te otorgan habilidades especiales que el jugador decide si recoger o no, en Inside Design existen las denominadas “IDEAS”.

Las “IDEAS” son todas esas modificaciones de atributos o habilidades de los Rogue Likes anteriores. Sin embargo, estas no las recoge el jugador, las deciden los diseñadores, que se las irán metiendo al jugador de forma arbitraria y como les parezca.
El jugador no puede rechazarlas y tendrá que jugar con ellas obligatoriamente, algunas le serán beneficiosas y otras perjudiciales, se tendrá que adaptar a lo que digan los diseñadores.

Hay 3 tipos de ideas que se explicarán más adelante.
Activas.
Pasivas .
Pasivas temporales.
Niveles
Aquí un esquema sobre la distribución de los niveles de una partida y su respectiva distribución de ideas.

Cada partida (vamos a llamarla RUN), se compone de 5 niveles que el jugador debe superar SIN MORIR. Una vez llegado al final del nivel 5 y superado del Boss, deberá decidir si finalizar la partida (se explicará el sistema de finales posteriormente) o continuar la partida en una nueva RUN con las habilidades obtenidas.

Cada nivel está distribuido por salas, como en The Binding of Isaac o Enter de Gungeon.
Al entrar en una sala, esta se cierra y no se volverá a abrir para poder avanzar hasta que el jugador no haya ELIMINADO A TODOS LOS ENEMIGOS DE LA MISMA.
Una vez completadas todas las salas, se pasa al siguiente nivel.


Los 3 tipos de IDEAS se activarán en momentos determinados de la partida y de los niveles.
Las ACTIVAS serán en la primera sala de cada uno de los niveles a partir del segundo. 












Las PASIVAS se activarán al finalizar una sala.


Las PASIVAS TEMPORALES se activarán de vez en cuando al entrar a una sala nueva con enemigos.












MECÁNICAS Y CONTROLES BASE
Inside Design es un Shooter-TopDown.
Es por eso que sus mecánicas de movimiento y disparo no difieren en nada de los juegos referentes, sobretodo de Nuclear Throne y Enter the Gungeon.

JUGADOR
Movimiento ortodireccional - wasd.
Apuntado de arma libre por toda la pantalla - cursor de ratón.
Disparo de arma (para aportar sensación al disparo, cada disparo produce un pequeño agitado de pantalla) - Click izquierdo de ratón.
(Dependerá del tipo de arma)
Click para cada disparo
Mantener pulsado
Mantener pulsado y soltar…

Utilización de “IDEA ACTIVA” (Habilidad) - Click derecho del ratón

SISTEMA DE VIDA 
De base, el jugador dispondrá de una barra de vida que funciona de forma discreta. 
Tendrá X puntos de vida, pongamos 10.
Cada daño recibido, normalmente por balas enemigas, restarán puntos de vida, 1, 2, 3… Dependiendo del ataque recibido.

SISTEMA DE MUNICIÓN
La munición no es infinita, cada arma gastará balas de una forma, la munición la soltarán los enemigos. Para información completa ir al sistema de armas más abajo.


ESTÉTICA
La primera versión del prototipo comprende este tipo de estética, pixelart sencillo de aproximadamente 32x32.
Como se comenta durante el sistema de ideas, la estética cambiará ocasionalmente, cambiando la visión del jugador.
Algunos ejemplos del concept son los siguientes.



Los personajes de los desarrolladores serán introducidos con stickmans de este estilo.
 




La música del juego también está sujeta a los cambios en ideas.
Gracias a David Carmona Fauste (@dcrm_f en twitter), alumno del grado en cuarto curso, que nos compondrá y producirá los temas, dispondremos de una canción con unas 10 o 12 variaciones.
-Estilo western
-Piano
-Años 30
-Techno…

DINÁMICA
Aquí se comenta la dinámica general del juego, aun así, remarcar que el “SISTEMA DE IDEAS”, recoge también su funcionamiento mecánico por facilitar el documento.

Inside Design al ser un videojuego web pretende conseguir un gameplay rápido, satisfactorio y rejugable, donde tus acciones no tengan demasiado peso, por eso mismo tú no te encargas de decidir nada, ya lo hacen los diseñadores(personajes) por ti.
El objetivo es conseguir que el jugador se adapte a todos los cambios que sucedan en el momento, o no, puede que haya ideas/mecánicas que no consigan buenas synergias, pero esa es una de las gracia del juego, esto va sobre el diseño y el diseño a veces no funciona.

SISTEMA DE IDEAS
Como se ha explicado antes, las “IDEAS” son las modificaciones que se introducen al juego.
Las introducen los personajes de los diseñadores con un mensaje en el juego y el jugador tiene que ceñirse a ellas.
Existen 3 tipos.

ACTIVAS
Son ideas que afectan al jugador. 
Tras ser introducidas se activan con [Click derecho], son habilidades e introducen directamente mecánicas para dar más posibilidades al gameplay.
Una vez activada tienen un cooldown antes de poder volver a usarse. El cooldown puede variar entre las diferentes ‘ideas’.
Como se menciona en el esquema de arriba, la introducción en la partida de estas IDEAS viene a ser la siguiente.
Durante el primer nivel el jugador no tiene ACTIVA.
En la primera sala del segundo nivel se le otorga y explicará la ACTIVA y no se le volverá a dar algo relacionado hasta la primera sala del siguiente nivel.
En las siguientes primeras salas, no se darán nuevas ACTIVAS, sino modificaciones de la primera que se le otorgó.
Por lo tanto cada ACTIVA tiene su funcionamiento base y como mínimo 3 modificaciones para poder cubrir los siguientes niveles.
Algunos ejemplos serían estos:


-Dash
Al pulsar botón “X” el jugador realiza un dash moderadamente rápido
Al estar activado, si chocas con un enemigo lo matas
El dash se sustituye por una voltereta, hace el mismo efecto (evitar balas) pero tiene menos alcance
Teletransporte automático en la dirección.

-Escudo
Mientras mantengas pulsado “X” pones un escudo al jugador, no le afectan las balas. El escudo dura un par de segundos.
Al estar activado las balas rebotan.
Al estar activado no te puedes mover.
Absorbe las balas y las devuelves cuando te lo quitas o cuando absorbe la cantidad máxima de balas (se desactiva cuando acumula el máximo de balas)

PASIVAS
Son IDEAS que se aplican ya sea al jugador, a los enemigos o al entorno pero no es necesario activarlas pulsando nada. Suelen ser modificaciones de atributos, reglas básicas o cambios estéticos.
Distinguimos 2 grandes grupos.

TEMPORALES
Se otorgan al entrar en una sala de vez en cuando (pongamos que si un nivel tiene 7 salas pueden aparecer en 1 o 2).
Una vez otorgadas duran x segundos antes de volver al estado normal (se muestra con una barra de tiempo).
La gracia de que sean temporales reside en que también son modificaciones muy raras y que cambian drásticamente el ritmo de juego durante un pequeño espacio de tiempo.
Anulan el resto de modificaciones de atributos y mecánicas que tenga el JUGADOR.
Algunos ejemplos son:

Ruta pacífica
Se le quitan los brazos y el arma al personaje y sólo se puede mover para esquivar balas.

Mario kart
El jugador se convierte en un coche. Este avanza sólo, el jugador controla la dirección de avance. Cuando choca con un enemigo lo atropella y lo mata. No es invulnerable a las balas. ¿Puedes frenar?

Invertido
Se invierten los controles de movimiento del jugador






NORMALES
Se otorgan cada vez que el jugador completa una sala, es decir, mata a todos los enemigos de la misma.
Son ideas que modifican atributos, reglas de gameplay, estética…
Son las más abundantes.
Además dentro de este tipo de ideas entran las armas. Su sistema se explicará más adelante.
Algunos ejemplos:
Botiquines buena onda
Los botiquines recuperan más vida.

Demasiado fácil
Caja de vida a la mitad.

Recargar
Las balas son infinitas pero cada x disparos se recarga el arma automáticamente, habiendo un cooldown de varios segundos.

Enemigos bomba
Todos los enemigos cuando mueren explotan, afectando la explosión a los demás enemigos y al jugador.

Oh baby a triple
Con cualquier arma, cuando disparas, disparas 3 balas.

Efectos vocales
Todo el audio del juego se sustituye por audios nuestros intentando replicarlo. piu piu, BSO, sonidos de muerte…

Daltónico
Se cambia la paleta de colores.

Modo cinemático
Se ponen las bandas negras, impidiendo ver al jugador ni la munición ni la vida.


SISTEMA DE ARMAS Y MUNICIÓN
El jugador sólo tiene un arma en todo momento.
Las armas necesitan munición que normálmente soltarán los enemigos al morir.
Si el jugador se queda sin munición, golpeará con los puños a melee a corta distancia.
De forma básica sin ninguna idea añadida, el funcionamiento será ese, y el jugador comenzará siempre con una pistola básica.

A las armas se aplicarán 2 tipos de ideas normales.


Tipo de arma
Cambia el arma que tiene el jugador por otra.
Armas disponibles:
A DISTANCIA (LAS MÁS COMUNES)
-Único click, cada disparo necesita un click
-Mantener click, mientras mantiendes se disparan balas
-Pistola básica
Único click
Cadencia/entre clicks: media
Daño/bala: medio

-Escopeta
Único click
Cadencia/entre clicks: baja
Daño/bala: alto

-Machine Gun
Mantener click 
Cadencia/entre disparos mantenidos: muy alta
Daño/bala: bajo

-Rifle de rafagas
Único click *cada vez que haces click disparas X balas
Cadencia/entre clicks:  media
Daño/bala: medio

-Rifle de asalto (metralleta)
Mantener click
Cadencia/entre disparos mantenido: medio/alta
Daño/bala: medio

-Rifle de francotirador
Único click
Cadencia/entre clicks: baja 
Daño/bala: muy alto

-Laser 
Único click
Cadencia/entre clicks: muy baja (mini cooldown de carga), cuando haces click pasa un pequeño tiempo hasta que sale el rayo
Daño/bala: muy alto






A MELEE (CUERPO A CUERO) (MENOS COMUNES)
-Sólo existe único click

-Puños
Cadencia/entre clicks: alta
Daño/golpe: bajo 

-Espadón
Cadencia/entre clicks: baja
Daño/golpe: muy alto, instakill

-Katana
Cadencia/entre clicks: alta
Daño/golpe: alto

-Crowbar
Cadencia/entre clicks: media
Daño/golpe: media

-Sable Laser
Cadencia/entre clicks: media
Daño/golpe: media

-Trofeo (cluedo)
Cadencia/entre clicks: baja
Daño/golpe: instakill

-Sartén
Cadencia/entre clicks: media
Daño/golpe: muy alto

-Matamoscas
Cadencia/entre clicks: muy alta
Daño/golpe: bajo


Como las armas son modulares, el siguiente tipo de ideas, afectan a cualquier arma activa (de momento sólo hay pensadas para las a distancia), son modificaciones generales de las armas, atributos, habilidades…
Algunos ejemplos son:

-Coolateral
Las balas atraviesan enemigos
-Rebote
Las balas rebotan en las paredes
-Triple
Todos los disparos disparan 3 balas en direcciones consecutivas.

Puedes ver todas las ideas en el siguiente enlace
Documento de ideas
FIN DE PARTIDA
Se finaliza la partida de 2 formas, muriendo o superando la run.

MURIENDO
Si el jugador muere durante la partida, se acaba y tendrá que volver a empezar desde 0. Se mostrará una escena aleatoria del estudio cancelando el juego de alguna manera.



RUN SUPERADA
Tras superar los 5 niveles y el boss final, se abren 2 opciones.
Finalizar la run
Se acaba el diseño (desarrollo) del juego, y se saca al mercado, accediendo a uno de los múltiples finales (por ahora aleatorios), en el que se mostrarán la acogida del juego y la situación de los desarrolladores.

Seguir con el diseño del juego.
Esto activará una escena de transición con los desarrolladores y 
comenzará una nueva run con más dificultad.
Si el jugador se la vuelve a pasar se le darán las mismas 2 opciones, cuantas más runs complete más exclusivos serán los finales que puedan aparecer.




SISTEMA DE COLECCIÓN DE IDEAS (GDD /WIKI)
Como se ve en el sistema de ideas, cada una tiene un nombre algo “artístico”. Esto se debe a que el juego tiene un sistema de coleccionables llamado “GDD”, donde se recogen todas las ideas que haya recogido el jugador, con sus nombres artísticos y detalles de diseño.

ARQUITECTURA DEL JUEGO
Archivo de la arquitectura aquí.
Imagen de la arquitectura aquí.

SISTEMA DE GESTIÓN 
Para realizar la gestión de las tareas a realizar utilizaremos pivotal tracker. El proyecto puede accederse desde www.pivotaltracker.com/n/projects/2470812


SISTEMA DE COMUNICACIÓN
Los miembros del equipo de desarrollo nos comunicaremos mediante nuestro propio servidor de Discord.

Referencias
Niebla, de Miguel de Unamuno - Wikipedia
Nuclear Throne	- Steam
Binding of Isaac	- Steam
Game Dev Tycoon - Steam
