// Base de datos de preguntas por categoría y dificultad
        const questionsDatabase = {
            religion: {
                easy: [
                    {
                        question: "¿En qué país nació María Petković?",
                        options: ["Croacia", "Italia", "España", "Argentina"],
                        correct: 0
                    },
                    {
                        question: "¿Cuál fue el nombre completo de María Petković?",
                        options: ["María de Jesús Crucificado Petković", "María de la Misericordia Petković", "María Teresa de Jesús Petković", " María Magdalena Petković"],
                        correct: 0
                    },
                    {
                        question: "¿En qué año fundó la Congregación de las Hijas de la Misericordia?",
                        options: ["1920", "1915", "1928", "1936"],
                        correct: 0
                    },
                    {
                        question: "¿Qué día se celebra su fiesta litúrgica?",
                        options: ["8 de Julio", "9 de Julio", "10 de Octubre", "12 de Agosto"],
                        correct: 0
                    },
                    {
                        question: "¿En qué ciudad nació San Francisco de Asís?",
                        options: ["Asís", "Florencia", "Roma", "Milán"],
                        correct: 0
                    }
                ],
                medium: [
                    {
                        question: "¿Cuántos discípulos tuvo Jesús?",
                        options: ["12", "10", "7", "15"],
                        correct: 0
                    },
                    {
                        question: " ¿Qué Papa beatificó a María Petković y en qué año?",
                        options: ["Juan Pablo II en 2003", " Pablo VI en 1975", "Juan Pablo I en 2003", "Benedicto XVI en 2008"],
                        correct: 0
                    },
                    {
                        question: "¿En qué continente realizó gran parte de su misión misionera María Petković ?",
                        options: ["América Latina", "Asia", "Europa", "África"],
                        correct: 0
                    },
                    {
                        question: "¿En qué país falleció María Petković?",
                        options: ["Italia", "Croacia", "Paraguay", "Venezuela"],
                        correct: 0
                    },
                    {
                        question: "¿Quién fue el primer Papa de la Iglesia Católica?",
                        options: ["San Pedro", "San Pablo", "San Juan", "San Andrés"],
                        correct: 0
                    }
                ],
                hard: [
                    {
                        question: "¿Cómo se llama la oración famosa atribuida a San Francisco?",
                        options: ["Oración de la Paz", "El Padrenuestro", " El Magníficat", "Ave María"],
                        correct: 0
                    },
                    {
                        question: "¿Por qué San Francisco es considerado el patrono de la ecología?",
                        options: ["Porque amaba y protegía la naturaleza y a los animales", "Porque escribió libros sobre ciencia", "Porque predicaba en los bosques", "Porque construyó monasterios en zonas rurales"],
                        correct: 0
                    },
                    {
                        question: "¿En qué año recibió San Francisco los estigmas de Cristo?",
                        options: ["1224", "1200", "1212", "1230"],
                        correct: 0
                    },
                    {
                        question: "¿Qué orden religiosa fundó San Francisco?",
                        options: ["Orden de loa Frailes Menores", " Orden de Predicadores", "Orden de San Benito", " Orden Carmelita"],
                        correct: 0
                    },
                    {
                        question: "¿Qué voto caracterizaba especialmente a San Francisco y sus frailes?",
                        options: ["Pobreza absoluta", "Silencio", "Ayuno Perpetuo", "Castidad Absoluta"],
                        correct: 0
                    }
                ]
            },
            general: {
                easy: [
                    {
                        question: "¿Cuál es el río más largo del mundo?",
                        options: ["Amazonas", "Nilo", "Misisipi", "Yangtsé"],
                        correct: 0
                    },
                    {
                        question: "¿Qué planeta es conocido como el planeta rojo?",
                        options: ["Marte", "Venus", "Júpiter", "Saturno"],
                        correct: 0
                    },
                    {
                        question: "¿Cuál es el océano más grande del mundo?",
                        options: ["Pacífico", "Atlántico", "Índico", "Ártico"],
                        correct: 0
                    },
                    {
                        question: "¿Quién pintó la Mona Lisa?",
                        options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Miguel Ángel"],
                        correct: 0
                    },
                    {
                        question: "¿Cuál es la capital de Francia?",
                        options: ["París", "Londres", "Roma", "Madrid"],
                        correct: 0
                    }
                ],
                medium: [
                    {
                        question: "¿Quién pintó 'La noche estrellada'?",
                        options: ["Vincent van Gogh", "Pablo Picasso", "Claude Monet", "Salvador Dalí"],
                        correct: 0
                    },
                    {
                        question: "¿Cuál es el elemento químico con símbolo 'O'?",
                        options: ["Oxígeno", "Oro", "Osmio", "Oganesón"],
                        correct: 0
                    },
                    {
                        question: "¿En qué año llegó el hombre a la luna?",
                        options: ["1969", "1972", "1965", "1975"],
                        correct: 0
                    },
                    {
                        question: "¿Quién escribió 'Cien años de soledad'?",
                        options: ["Gabriel García Márquez", "Mario Vargas Llosa", "Julio Cortázar", "Pablo Neruda"],
                        correct: 0
                    },
                    {
                        question: "¿Cuál es el metal más conductor de electricidad?",
                        options: ["Plata", "Cobre", "Oro", "Aluminio"],
                        correct: 0
                    }
                ],
                hard: [
                    {
                        question: "¿En qué año cayó el Muro de Berlín?",
                        options: ["1989", "1991", "1985", "1979"],
                        correct: 0
                    },
                    {
                        question: "¿Quién descubió la penicilina?",
                        options: ["Alexander Fleming", "Louis Pasteur", "Robert Koch", "Marie Curie"],
                        correct: 0
                    },
                    {
                        question: "¿Cuál es el país más grande del mundo por área?",
                        options: ["Rusia", "Canadá", "China", "Estados Unidos"],
                        correct: 0
                    },
                    {
                        question: "¿Quién compuso 'La flauta mágica'?",
                        options: ["Wolfgang Amadeus Mozart", "Ludwig van Beethoven", "Johann Sebastian Bach", "Richard Wagner"],
                        correct: 0
                    },
                    {
                        question: "¿En qué año se fundó la ONU?",
                        options: ["1945", "1919", "1955", "1939"],
                        correct: 0
                    }
                ]
            },
            entertainment: {
                easy: [
                    {
                        question: "¿Qué actor interpretó a Iron Man en el UCM?",
                        options: ["Robert Downey Jr.", "Chris Evans", "Chris Hemsworth", "Mark Ruffalo"],
                        correct: 0
                    },
                    {
                        question: "¿Cómo se llama la princesa en 'La Sirenita'?",
                        options: ["Ariel", "Jasmine", "Bella", "Cenicienta"],
                        correct: 0
                    },
                    {
                        question: "¿Qué banda musical era liderada por Freddie Mercury?",
                        options: ["Queen", "The Beatles", "Led Zeppelin", "The Rolling Stones"],
                        correct: 0
                    },
                    {
                        question: "¿En qué año se estrenó 'Toy Story', la primera película de Pixar?",
                        options: ["1995", "1990", "2000", "1988"],
                        correct: 0
                    },
                    {
                        question: "¿Qué personaje de ficción vive en una piña bajo el mar?",
                        options: ["Bob Esponja", "Patricio Estrella", "Calamardo", "Don Cangrejo"],
                        correct: 0
                    }
                ],
                medium: [
                    {
                        question: "¿Qué director dirigió 'El Padrino'?",
                        options: ["Francis Ford Coppola", "Martin Scorsese", "Steven Spielberg", "Alfred Hitchcock"],
                        correct: 0
                    },
                    {
                        question: "¿En qué año se estrenó 'Star Wars: Una nueva esperanza'?",
                        options: ["1977", "1980", "1975", "1983"],
                        correct: 0
                    },
                    {
                        question: "¿Qué actor interpretó a Jack Dawson en 'Titanic'?",
                        options: ["Leonardo DiCaprio", "Brad Pitt", "Johnny Depp", "Matt Damon"],
                        correct: 0
                    },
                    {
                        question: "¿Qué serie de TV es conocida por el personaje Walter White?",
                        options: ["Breaking Bad", "The Sopranos", "Game of Thrones", "The Wire"],
                        correct: 0
                    },
                    {
                        question: "¿Qué cantante es conocida como 'La Reina del Pop'?",
                        options: ["Madonna", "Britney Spears", "Lady Gaga", "Beyoncé"],
                        correct: 0
                    }
                ],
                hard: [
                    {
                        question: "¿Qué película ganó el Óscar a mejor película en 2020?",
                        options: ["Parásitos", "1917", "Joker", "Érase una vez en Hollywood"],
                        correct: 0
                    },
                    {
                        question: "¿Quién compuso la banda sonora de 'El Señor de los Anillos'?",
                        options: ["Howard Shore", "John Williams", "Hans Zimmer", "James Horner"],
                        correct: 0
                    },
                    {
                        question: "¿Qué actor ha interpretado a James Bond en más películas?",
                        options: ["Roger Moore", "Sean Connery", "Daniel Craig", "Pierce Brosnan"],
                        correct: 0
                    },
                    {
                        question: "¿En qué año se estrenó 'The Sims', el videojuego de simulación de vida?",
                        options: ["2000", "1998", "2002", "2004"],
                        correct: 0
                    },
                    {
                        question: "¿Qué director de cine es conocido por sus cameos en sus propias películas?",
                        options: ["Alfred Hitchcock", "Stanley Kubrick", "Quentin Tarantino", "Steven Spielberg"],
                        correct: 0
                    }
                ]
            },
            computing: {
                easy: [
                    {
                        question: "¿Qué significa CPU?",
                        options: ["Unidad Central de Procesamiento", "Computadora Personal Unificada", "Controlador Principal de Usuario", "Circuito Principal de Unidad"],
                        correct: 0
                    },
                    {
                        question: "¿Qué compañía creó Windows?",
                        options: ["Microsoft", "Apple", "IBM", "Google"],
                        correct: 0
                    },
                    {
                        question: "¿Qué navegador web desarrolla Google?",
                        options: ["Chrome", "Firefox", "Safari", "Edge"],
                        correct: 0
                    },
                    {
                        question: "¿Qué significa HTML?",
                        options: ["Lenguaje de Marcado de Hipertexto", "Herramientas de Maquetación de Texto Líquido", "Hiper Transferencia de Métodos Lógicos", "Herramientas de Texto Multi-Línea"],
                        correct: 0
                    },
                    {
                        question: "¿Qué compañía es dueña de Android?",
                        options: ["Google", "Microsoft", "Apple", "Samsung"],
                        correct: 0
                    }
                ],
                medium: [
                    {
                        question: "¿Qué lenguaje de programación se usa principalmente para desarrollo web frontend?",
                        options: ["JavaScript", "Python", "Java", "C++"],
                        correct: 0
                    },
                    {
                        question: "¿Qué significa la sigla URL?",
                        options: ["Localizador Uniforme de Recursos", "Unión de Redes Locales", "Usuario de Referencia Local", "Unificación de Rutas Lógicas"],
                        correct: 0
                    },
                    {
                        question: "¿Quién fundó Apple Inc.?",
                        options: ["Steve Jobs y Steve Wozniak", "Bill Gates y Paul Allen", "Mark Zuckerberg", "Larry Page y Sergey Brin"],
                        correct: 0
                    },
                    {
                        question: "¿Qué estructura de datos es LIFO (Last-In-First-Out)?",
                        options: ["Pila", "Cola", "Lista", "Árbol"],
                        correct: 0
                    },
                    {
                        question: "¿Qué protocolo se utiliza para enviar correos electrónicos?",
                        options: ["SMTP", "HTTP", "FTP", "TCP"],
                        correct: 0
                    }
                ],
                hard: [
                    {
                        question: "¿Quién es considerado el primer programador de la historia?",
                        options: ["Ada Lovelace", "Alan Turing", "Charles Babbage", "Bill Gates"],
                        correct: 0
                    },
                    {
                        question: "¿En qué año se creó el lenguaje de programación Python?",
                        options: ["1991", "1989", "1995", "2000"],
                        correct: 0
                    },
                    {
                        question: "¿Qué significa API?",
                        options: ["Interfaz de Programación de Aplicaciones", "Acceso Programático a Internet", "Aplicación para Interconexión", "Automatización de Procesos Informáticos"],
                        correct: 0
                    },
                    {
                        question: "¿Qué algoritmo de compresión sin pérdida es usado en formatos ZIP?",
                        options: ["DEFLATE", "LZ77", "LZW", "Huffman"],
                        correct: 0
                    },
                    {
                        question: "¿En qué año se lanzó el primer iPhone?",
                        options: ["2007", "2005", "2008", "2006"],
                        correct: 0
                    }
                ]
            }
        };
        //Audio 
    window.addEventListener('load', function() {
            const miAudio = document.getElementById('miAudio');
            miAudio.removeAttribute('controls');
        });

        // Variables del juego
        let selectedCategory = null;
        let selectedDifficulty = null;
        let currentQuestions = [];
        let currentQuestionIndex = 0;
        let score = 0;
        let answered = false;

        // Elementos DOM
        const startScreen = document.getElementById('start-screen');
        const gameScreen = document.getElementById('game-screen');
        const resultScreen = document.getElementById('result-screen');
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');
        const nextButton = document.getElementById('next-btn');
        const scoreValue = document.getElementById('score-value');
        const finalScoreValue = document.getElementById('final-score-value');
        const feedbackContainer = document.getElementById('feedback-container');
        const progressContainer = document.getElementById('progress-container');
        const startButton = document.getElementById('start-btn');

        // Event listeners para botones de categoría
        document.querySelectorAll('.category-btn').forEach(button => {
            button.addEventListener('click', () => {
                selectedCategory = button.getAttribute('data-category');
                // Resaltar botón seleccionado
                document.querySelectorAll('.category-btn').forEach(btn => {
                    btn.classList.remove('selected');
                });
                button.classList.add('selected');
                
                // Habilitar el botón de inicio si también se ha seleccionado dificultad
                if (selectedDifficulty) {
                    startButton.disabled = false;
                }
            });
        });

        // Event listeners para botones de dificultad
        document.querySelectorAll('.difficulty-btn').forEach(button => {
            button.addEventListener('click', () => {
                selectedDifficulty = button.getAttribute('data-difficulty');
                
                // Habilitar el botón de inicio si también se ha seleccionado categoría
                if (selectedCategory) {
                    startButton.disabled = false;
                }
            });
        });

        // Event listener para el botón de inicio
        startButton.addEventListener('click', startGame);

        // Event listener para el botón siguiente
        nextButton.addEventListener('click', () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < currentQuestions.length) {
                showQuestion();
            } else {
                endGame();
            }
        });

        // Event listener para jugar de nuevo
        document.getElementById('play-again-btn').addEventListener('click', () => {
            resultScreen.style.display = 'none';
            startScreen.style.display = 'block';
            resetGame();
        });

        // Función para iniciar el juego
        function startGame() {
            // Obtener preguntas según categoría y dificultad
            currentQuestions = questionsDatabase[selectedCategory][selectedDifficulty];
            
            // Mezclar preguntas para variar el juego
            shuffleArray(currentQuestions);
            
            // Reiniciar variables del juego
            currentQuestionIndex = 0;
            score = 0;
            scoreValue.textContent = score;
            
            // Crear indicadores de progreso
            progressContainer.innerHTML = '';
            for (let i = 0; i < currentQuestions.length; i++) {
                const step = document.createElement('div');
                step.className = 'progress-step';
                if (i === 0) step.classList.add('active');
                progressContainer.appendChild(step);
            }
            
            // Cambiar a pantalla de juego
            startScreen.style.display = 'none';
            gameScreen.style.display = 'block';
            
            // Mostrar primera pregunta
            showQuestion();
        }

        // Función para mostrar una pregunta
        function showQuestion() {
            answered = false;
            nextButton.style.visibility = 'hidden';
            feedbackContainer.innerHTML = '';
            
            // Actualizar indicadores de progreso
            document.querySelectorAll('.progress-step').forEach((step, index) => {
                step.classList.remove('active');
                if (index === currentQuestionIndex) {
                    step.classList.add('active');
                }
            });
            
            const question = currentQuestions[currentQuestionIndex];
            questionText.textContent = question.question;
            
            // Limpiar opciones anteriores
            optionsContainer.innerHTML = '';
            
            // Crear botones para cada opción
            question.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.textContent = option;
                button.className = 'option-btn';
                button.addEventListener('click', () => checkAnswer(index));
                optionsContainer.appendChild(button);
            });
        }

        // Función para comprobar la respuesta
        function checkAnswer(selectedIndex) {
            if (answered) return;
            
            answered = true;
            const question = currentQuestions[currentQuestionIndex];
            const options = document.querySelectorAll('.option-btn');
            
            // Actualizar el indicador de progreso
            const progressSteps = document.querySelectorAll('.progress-step');
            
            // Mostrar feedback visual
            if (selectedIndex === question.correct) {
                // Respuesta correcta
                options[selectedIndex].classList.add('correct');
                score += 10;
                scoreValue.textContent = score;
                progressSteps[currentQuestionIndex].classList.add('correct');
                
                // Mostrar imagen de respuesta correcta
                feedbackContainer.innerHTML = `
                    <img src="https://cdn.pixabay.com/photo/2016/03/31/14/37/check-mark-1292787_640.png" alt="Correcto" class="feedback-image">
                    <div class="feedback correct-feedback">¡Correcto! +10 puntos</div>
                `;
            } else {
                // Respuesta incorrecta
                options[selectedIndex].classList.add('incorrect');
                options[question.correct].classList.add('correct');
                progressSteps[currentQuestionIndex].classList.add('incorrect');
                
                // Mostrar imagen de respuesta incorrecta
                feedbackContainer.innerHTML = `
                    <img src="https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131_640.png" alt="Incorrecto" class="feedback-image">
                    <div class="feedback incorrect-feedback">Incorrecto. La respuesta correcta es: ${question.options[question.correct]}</div>
                `;
            }
            
            // Deshabilitar todos los botones de opción
            options.forEach(option => {
                option.disabled = true;
            });
            
            // Mostrar botón siguiente
            nextButton.style.visibility = 'visible';
        }

        // Función para terminar el juego
        function endGame() {
            gameScreen.style.display = 'none';
            resultScreen.style.display = 'block';
            finalScoreValue.textContent = score;
        }

        // Función para reiniciar el juego
        function resetGame() {
            selectedCategory = null;
            selectedDifficulty = null;
            startButton.disabled = true;
            
            // Restablecer estilos de botones
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
        }

        // Función para mezclar array (algoritmo Fisher-Yates)
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }