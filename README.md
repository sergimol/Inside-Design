# Inside Design

Captura del juego:

![unnamed](https://user-images.githubusercontent.com/62661210/102732161-3b7acd80-433a-11eb-852b-2926a6d1c410.png)

## Un juego de Hummus Sapiens

Disponible en: https://sergimol.github.io/Inside-Design/

Página de gestión: https://www.pivotaltracker.com/n/projects/2470812

### GDD:

Inside Design
Documento de diseño de videojuego
-  Hummus Sapiens -
Twitter
Versión 3.0 - 20/12/2020

#### Resumen

Géneros: Rogue-like, top down, shoot’em up

Modos: Un Jugador

Público objetivo: Todos los públicos, al ser un videojuego red cualquier usuario con internet puede acceder a él. No se necesitan conocimientos específicos para jugarlo.

Plataformas: Web

Hitos: 

0 - Propuesta de proyecto - 14/10/2020

1 - Base final del juego y prototipado - 23/11/2020


#### Descripción
Inside Design es un top down shooter rogue-like en el que se pretende realizar una simulación del proceso de desarrollo de un videojuego. Mientras el jugador avanza por los niveles, tendrá que lidiar con las mecánicas introducidas por los personajes de los desarrolladores.

Logotipo y portada del juego


![unnamed](https://user-images.githubusercontent.com/62880649/100166930-24bd9400-2ebe-11eb-851d-2ab756ffba62.jpg)



#### RESUMEN DE OBJETIVOS, REGLAS Y DINÁMICAS
Como se ha mencionado antes, Inside Design es un Rogue Like, o como más nos gusta llamarlo, un Rigue Loke. Unamuno tenía la nivola y nosotros esto.

A diferencia de Rogue likes como Nuclear Throne, Enter the Gungeon o The Binding of Isaac, en los cuales, al ir superando salas y niveles puedes ir obteniendo recompensas que te mejoran atributos o te otorgan habilidades especiales que el jugador decide si recoger o no, en Inside Design existen las denominadas “IDEAS”.

Las “IDEAS” son todas esas modificaciones de atributos o habilidades de los Rogue Likes anteriores. Sin embargo, estas no las recoge el jugador, las deciden los diseñadores, que se las irán metiendo al jugador de forma arbitraria y como les parezca.
El jugador no puede rechazarlas y tendrá que jugar con ellas obligatoriamente, algunas le serán beneficiosas y otras perjudiciales, se tendrá que adaptar a lo que digan los diseñadores.

Hay 3 tipos de ideas que se explicarán más adelante.
##### · Activas.
##### · Pasivas.
##### · Pasivas temporales.

#### Niveles

Aquí un esquema sobre la distribución de los niveles de una partida y su respectiva distribución de ideas.

![unnamed (1)](https://user-images.githubusercontent.com/62880649/100166934-25562a80-2ebe-11eb-9809-a19d27b50c04.jpg)

Cada partida (vamos a llamarla RUN), se compone de 5 niveles que el jugador debe superar SIN MORIR. Una vez llegado al final del nivel 5 y superado del Boss, deberá decidir si finalizar la partida (se explicará el sistema de finales posteriormente) o continuar la partida en una nueva RUN con las habilidades obtenidas.

![unnamed](https://user-images.githubusercontent.com/62880649/100166933-25562a80-2ebe-11eb-838a-41b5cf135254.png)

Cada nivel está distribuido por salas, como en The Binding of Isaac o Enter de Gungeon.
Al entrar en una sala, esta se cierra y no se volverá a abrir para poder avanzar hasta que el jugador no haya ELIMINADO A TODOS LOS ENEMIGOS DE LA MISMA.
Una vez completadas todas las salas, se pasa al siguiente nivel.

![unnamed (1)](https://user-images.githubusercontent.com/62880649/100166935-25562a80-2ebe-11eb-9b19-79cfc91d40c6.png)


Los 3 tipos de IDEAS se activarán en momentos determinados de la partida y de los niveles.
Las ACTIVAS serán en la primera sala de cada uno de los niveles a partir del segundo. 

![unnamed (2)](https://user-images.githubusercontent.com/62880649/100166939-26875780-2ebe-11eb-88e9-a226fe8e6c85.png)

Las PASIVAS se activarán al finalizar una sala.

![unnamed (3)](https://user-images.githubusercontent.com/62880649/100166919-225b3a00-2ebe-11eb-90ce-44e0398e7dd1.png)

Las PASIVAS TEMPORALES se activarán de vez en cuando al entrar a una sala nueva con enemigos.












#### MECÁNICAS Y CONTROLES BASE
Inside Design es un Shooter-TopDown.
Es por eso que sus mecánicas de movimiento y disparo no difieren en nada de los juegos referentes, sobretodo de Nuclear Throne y Enter the Gungeon.

##### JUGADOR
Movimiento ortodireccional - wasd.
Apuntado de arma libre por toda la pantalla - cursor de ratón.
Disparo de arma (para aportar sensación al disparo, cada disparo produce un pequeño agitado de pantalla) - Click izquierdo de ratón.
(Dependerá del tipo de arma)
Click para cada disparo
Mantener pulsado
Mantener pulsado y soltar…

Utilización de “IDEA ACTIVA” (Habilidad) - Click derecho del ratón

##### SISTEMA DE VIDA 
De base, el jugador dispondrá de una barra de vida que funciona de forma discreta. 
Tendrá X puntos de vida, pongamos 10.
Cada daño recibido, normalmente por balas enemigas, restarán puntos de vida, 1, 2, 3… Dependiendo del ataque recibido.

##### SISTEMA DE MUNICIÓN
La munición no es infinita, cada arma gastará balas de una forma, la munición la soltarán los enemigos. Para información completa ir al sistema de armas más abajo.


#### ESTÉTICA

![unnamed (4)](https://user-images.githubusercontent.com/62880649/100166922-22f3d080-2ebe-11eb-9317-36362a190f59.jpg)

La primera versión del prototipo comprende este tipo de estética, pixelart sencillo de aproximadamente 32x32.
Como se comenta durante el sistema de ideas, la estética cambiará ocasionalmente, cambiando la visión del jugador.
Algunos ejemplos del concept son los siguientes.

![unnamed (5)](https://user-images.githubusercontent.com/62880649/100166923-22f3d080-2ebe-11eb-8119-db9d116f9e12.jpg)
![unnamed (2)](https://user-images.githubusercontent.com/62880649/100166937-25eec100-2ebe-11eb-8d1a-c45f60a272ed.jpg)
![unnamed (3)](https://user-images.githubusercontent.com/62880649/100166940-26875780-2ebe-11eb-9873-4d90002da0f4.jpg)



Los personajes de los desarrolladores serán introducidos con stickmans de este estilo.


![unnamed (6)](https://user-images.githubusercontent.com/62880649/100166925-238c6700-2ebe-11eb-8a48-8ca4ddf83de9.jpg)
 


##### Música

La música del juego también está sujeta a los cambios en ideas.
Gracias a David Carmona Fauste (@dcrm_f en twitter), alumno del grado en cuarto curso, que nos compondrá y producirá los temas, dispondremos de una canción con unas 10 o 12 variaciones.
-Estilo western
-Piano
-Años 30
-Techno…

#### DINÁMICA
Aquí se comenta la dinámica general del juego, aun así, remarcar que el “SISTEMA DE IDEAS”, recoge también su funcionamiento mecánico por facilitar el documento.

Inside Design al ser un videojuego web pretende conseguir un gameplay rápido, satisfactorio y rejugable, donde tus acciones no tengan demasiado peso, por eso mismo tú no te encargas de decidir nada, ya lo hacen los diseñadores(personajes) por ti.
El objetivo es conseguir que el jugador se adapte a todos los cambios que sucedan en el momento, o no, puede que haya ideas/mecánicas que no consigan buenas synergias, pero esa es una de las gracia del juego, esto va sobre el diseño y el diseño a veces no funciona.

#### SISTEMA DE IDEAS
Como se ha explicado antes, las “IDEAS” son las modificaciones que se introducen al juego.
Las introducen los personajes de los diseñadores con un mensaje en el juego y el jugador tiene que ceñirse a ellas.
Existen 3 tipos:

##### ACTIVAS
Son ideas que afectan al jugador. 
Tras ser introducidas se activan con [Click derecho], son habilidades e introducen directamente mecánicas para dar más posibilidades al gameplay.
Una vez activada tienen un cooldown antes de poder volver a usarse. El cooldown puede variar entre las diferentes ‘ideas’.
Como se menciona en el esquema de arriba, la introducción en la partida de estas IDEAS viene a ser la siguiente.
Durante el primer nivel el jugador no tiene ACTIVA.
En la primera sala del segundo nivel se le otorga y explicará la ACTIVA y no se le volverá a dar algo relacionado hasta la primera sala del siguiente nivel.
En las siguientes primeras sala, no se le dará una nueva ACTIVA, sino que se modificará la primera que se le otorgó.
Por lo tanto cada ACTIVA tiene su funcionamiento base y 1 modificación.

###### -Dash: 
Al activarla el jugador realiza un dash moderadamente rápido.
Modificación:
 Al estar activado, si chocas con un enemigo lo matas

###### -Escudo:
Al activarla pone un escudo al jugador que le protege de las balas. El escudo dura un par de segundos.
Modificación:
 Al estar activado las balas rebotan.

###### -Ataque en área:
Cuando se activa, destruye las balas en un radio determinado.
Modificación:
 Además de destruir las balas, hace daño a los enemigos.


##### PASIVAS
Son IDEAS que se aplican ya sea al jugador, a los enemigos o al entorno pero no es necesario activarlas pulsando nada. Suelen ser modificaciones de atributos, reglas básicas o cambios estéticos.
Distinguimos 2 grandes grupos:

###### PASIVAS TEMPORALES
Se otorgan al entrar en una sala de vez en cuando (pongamos que si un nivel tiene 7 salas pueden aparecer en 1 o 2).
Una vez otorgadas duran x segundos antes de volver al estado normal (se muestra con una barra de tiempo).
La gracia de que sean temporales reside en que también son modificaciones muy raras y que cambian drásticamente el ritmo de juego durante un pequeño espacio de tiempo.
Anulan el resto de modificaciones de atributos y mecánicas que tenga el JUGADOR.
Algunos ejemplos son:

###### -Ruta pacífica:
Se le quitan los brazos y el arma al personaje y sólo se puede mover para esquivar balas.

###### -Ruta genocida:
Los enemigos no atacan y huyen del jugador

###### -Mario kart
El jugador se convierte en un coche. Este avanza sólo, el jugador controla la dirección de avance(movimiento estilo snake). Cuando choca con un enemigo lo atropella y lo mata. No es invulnerable a las balas. ¿Puedes frenar?

###### -Borracho
Se invierten los controles de movimiento del jugador


##### NORMALES
Se otorgan cada vez que el jugador completa una sala, es decir, mata a todos los enemigos de la misma.
Son ideas que modifican atributos, reglas de gameplay, estética…
Son las más abundantes.
Además dentro de este tipo de ideas entran las armas. Su sistema se explicará más adelante.

Ideas normales que cambian los atributos del jugador y los drops que recibe:

###### -Botiquines buena onda
Los botiquines recuperan más vida.

###### -Botiquines mala onda
Los botiquines recuperan menos vida.

###### -Me lo tanqueo
La vida del jugador aumenta.

###### -Demasiado fácil
Caja de vida a la mitad.

###### -Sanic 
La velocidad del jugador aumenta.

###### -Cogo
La velocidad del jugador disminuye.

###### -Balas más lentas
La velocidad de las balas disminuye.

###### -Balas más rápidas 
La velocidad de las balas aumenta.

###### -Ojo de halcón
La dispersión del disparo respecto del puntero disminuye(mejor puntería).

###### -Stormtrooper
La dispersión del disparo respecto del puntero aumenta(peor puntería).

###### -Rambo
Munición infinita.

###### -Cambio de arma
El arma se sustituye por otra aleatoria.

Ideas normales que modifican o añaden mecánicas:

###### -Siameses
Aparece un clon pegado al jugador que dispara en dirección contraria a él. La munición se gasta el doble de rápido.

###### -Pinball
Las balas rebotan en las paredes.

###### -No me pises lo fregao
El suelo resbala.

###### -Caballero hueco
Al morir, resucitas con 1 de vida y skin de hueco.

###### -Enemigos bomba
Todos los enemigos explotan al morir, haciendo daño tanto a otros enemigos como al jugador si les alcanza la explosión.

###### -CRUNCH
El equipo de desarrollo entra en crunch. El jugador tiene que pasarse el nivel en un tiempo limitado o perderá. 
Se siguen aplicando ideas exclusivamente sobre atributos.

Ideas normales que modifican la estética del juego.

###### -Efectos vocales
Todo el audio del juego se sustituye por audios nuestros intentando replicarlo.

###### -Plin plin plon
La banda sonora pasa a estar tocada en piano.

###### -Hummus Simulator
La cabeza del jugador se sustituye por un tarro de hummus.

###### -Neon Rider
El juego se pone en blanco y negro.

###### -Daltónico
Se cambia la paleta de colores.

###### -Años 30
Se pone un filtro de dibujos animados antiguos por encima, a lo cuphead, música estilo años 30.

###### -Western
La ambientación pasa a ser del viejo oeste.

###### -Modo cinemático
Se ponen las bandas negras, impidiendo ver al jugador ni la munición ni la vida.

###### -El dilema de la barra de vida
Roja o verde? la gracia de esta ide es que si aparece en una partida se vaya repitiendo. un desarrollador dice rojo, otro verde, uno rojo , otro verde…

###### -HUUUUUUUD
La interfaz se hace mucho más grande.

###### -"Minimapa"
Aparece un minimapa en una esquina de la pantalla, aunque no representa el juego ni le es útil al jugador.

###### -Ataques de pánico
Cuando golpean al personaje, la pantalla se pone borrosa

###### -Juego de miedo
El juego adopta la estética típica de un juego de mie

###### -Fallo en el push
Archivos corrompidos, texturas corrompidas o cambiadas.

###### -Cambios en la estética del jugador
Cambia el sombrero, el pelo, la ropa, el género, etc. del personaje.

#### SISTEMA DE ARMAS Y MUNICIÓN
El jugador sólo tiene un arma en todo momento.
Las armas a distancia necesitan munición que normálmente soltarán los enemigos al morir.
Si el jugador se queda sin munición, golpeará cuerpo a cuerpo con el arma.
De forma básica sin ninguna idea añadida, el funcionamiento será ese, y el jugador comenzará siempre con una pistola básica.

Armas disponibles:
###### A DISTANCIA (LAS MÁS COMUNES)

-Pistola básica
Semiautomática
Cadencia: media
Daño/bala: medio

-Escopeta
Semiautomática
Cadencia: baja
Daño/bala: alto

-Machine Gun
Automática 
Cadencia/entre disparos mantenidos: muy alta
Daño/bala: bajo

-Rifle de rafagas
Semiautomática(ráfagas de 3 balas)
Cadencia:  media
Daño/bala: medio

-Rifle de asalto (metralleta)
Automática
Cadenciao: medio/alta
Daño/bala: medio

-Rifle de francotirador
Semiautomático
Cadencia/entre clicks: muy baja 
Daño/bala: muy alto

-Laser 
Único click
Cadencia/entre clicks: muy baja (mini cooldown de carga), cuando haces click pasa un pequeño tiempo hasta que sale el rayo
Daño/bala: muy alto

##### A MELEE (CUERPO A CUERO) (MENOS COMUNES)
-Sólo existe único click

-Espadón
Cadencia: muy baja
Daño/golpe: muy alto, instakill

-Katana
Cadencia: alta
Daño/golpe: medio

#### Modificadores

Como las armas son modulares, el siguiente tipo de ideas, afectan a cualquier arma activa (de momento sólo hay pensadas para las a distancia), son modificaciones generales de las armas, atributos, habilidades…
Algunos ejemplos son:

-Collateral
Las balas atraviesan enemigos
-Rebote
Las balas rebotan en las paredes
-Triple
Todos los disparos disparan 3 balas en direcciones consecutivas.

#### FIN DE PARTIDA
Se finaliza la partida de 2 formas, muriendo o superando la run.

##### MURIENDO
Si el jugador muere durante la partida, se acaba y tendrá que volver a empezar desde 0. Se mostrará una escena aleatoria del estudio cancelando el juego de alguna manera.


![unnamed (7)](https://user-images.githubusercontent.com/62880649/100166926-238c6700-2ebe-11eb-9d7b-09c673cfa8d6.jpg)
![unnamed (9)](https://user-images.githubusercontent.com/62880649/100166928-2424fd80-2ebe-11eb-8ba7-066ae93cf3b3.jpg)

##### RUN SUPERADA
Tras superar los 5 niveles y el boss final, se abren 2 opciones.
###### Finalizar la run
Se acaba el diseño (desarrollo) del juego, y se saca al mercado, accediendo a uno de los múltiples finales (por ahora aleatorios), en el que se mostrarán la acogida del juego y la situación de los desarrolladores.

###### Seguir con el diseño del juego.
Esto activará una escena de transición con los desarrolladores y 
comenzará una nueva run con más dificultad.
Si el jugador se la vuelve a pasar se le darán las mismas 2 opciones, cuantas más runs complete más exclusivos serán los finales que puedan aparecer.

![unnamed (8)](https://user-images.githubusercontent.com/62880649/100166927-2424fd80-2ebe-11eb-98ee-ccdd66904adf.jpg)


##### SISTEMA DE COLECCIÓN DE IDEAS (GDD /WIKI)
Como se ve en el sistema de ideas, cada una tiene un nombre algo “artístico”. Esto se debe a que el juego tiene un sistema de coleccionables llamado “GDD”, donde se recogen todas las ideas que haya recogido el jugador, con sus nombres artísticos y detalles de diseño.

##### ARQUITECTURA DEL JUEGO
Archivo de la arquitectura aquí.
Imagen de la arquitectura aquí.

##### SISTEMA DE GESTIÓN 
Para realizar la gestión de las tareas a realizar utilizaremos pivotal tracker. El proyecto puede accederse desde www.pivotaltracker.com/n/projects/2470812


##### SISTEMA DE COMUNICACIÓN
Los miembros del equipo de desarrollo nos comunicaremos mediante nuestro propio servidor de Discord.

##### Referencias
Niebla, de Miguel de Unamuno - Wikipedia
Nuclear Throne	- Steam
Binding of Isaac	- Steam
Game Dev Tycoon - Steam
