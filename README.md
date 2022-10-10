# Librería MDD. Parser md to html

MDD es una librería que transcribe un documento MD a un documento HTML. El objetivo del proyecto es facilitar la producción de páginas web estáticas y que los escritores puedan enfocar su tiempo en la producción de sus textos. 

![Librería MDD](images/mdd.svg)

MDD se basa en el modelo de la librería [Marked](https://github.com/markedjs/marked) creada por Christopher Jeffrey bajo la Licencia MIT.

Acceda a la página [demo](/demo/mdd.html) para transformar un documento md a html.

## Comandos

La librería está programada en Javascript haciendo uso de node.js para la modularizacion del código. Para ejecutar el código es necesario tener instalado node.js y usar un comando con el siguiente formato:

```
node mdd.js [nombre del documento .md] [parámetro de salida: html o latex]
```  

Ejemplo:

```
node mdd.js demo.md html
```

Por otra parte, hacemos uso de browserify para transcribir la librería a un documento javascript que sea accesible desde una página web. 

```
browserify mdd.js --standalone mdd > dist/mdd.min.js
```

## Diseño

![Diseño](images/design.svg)

El sistema está divido en dos partes. En la primera etapa, el módulo central MDD entrega el documento markdown original, el sistema descompone el documento en sus categorizables partes más pequeñas y genera a cambio una lista de tokens. Los tokens son pequeños diccionarios recursivos que contienen la información de un elemento. Por ejemplo, si analizamos el siguiente código markdown:

```
# Título

Texto **del** artículo
```

La lista de tokens resultante será:

```
0:
    type: "title"
    raw: "# Título\n"
    text: "Título"
    
1: 
    type: "paragraph"
    raw: "\nTexto **del** artículo"
    text: "Texto **del** artículo"
    tokens: 0: 
                type: bold
                raw: Texto **del** artículo
                text: del
                previous: Texto
                next: artículo
```

El módulo Lexer se encarga de organizar los tokens, no de generarlos. Lexer es el controlador que estudia y reduce poco a poco el documento original mientras apila de forma paralela la lista de tokens correspondientes que genera Tokenizer para él. Dentro de su función está analizar la recursividad del documento.

Tokenizer es un módulo simple. Recibe de Lexer un documento y devuelve el primer token que observa basado en los regex definidos en Rules. Lexer como respuesta quita del documento markdown la información de ese token y vuelve a consultarle a Tokenizer por el siguiente token del documento una y otra vez hasta finalizar.

Cuando Lexer termina de descomponer en sus partes todo el documento markdown inicial le devuelve a MDD la lista completa de tokens y MDD empieza la segunda etapa del proceso. 

En la segunda parte del proceso el módulo MDD le pasa a Parser la lista de tokens y Parser le devuelve a cambio el código HTML correspondiente. Por ejemplo, para la lista de tokens:

```
0:
    type: "title"
    raw: "# Título\n"
    text: "Título"
    
1: 
    type: "paragraph"
    raw: "\nTexto **del** artículo"
    text: "Texto **del** artículo"
    tokens: 0: 
                type: bold
                raw: Texto **del** artículo
                text: del
                previous: Texto
                next: artículo
```

Parser devuelve:

```
<h1> Título </h1>
<p> Texto <b>del</b> artículo </p>
```

Al igual que Lexer, Parser es recusivo ya que analiza todos los niveles de los tokens y para cada nivel encadena la traducción html correspondiente. 

## Sintaxis

MDD usa la sintaxis markdown base pero también agrega otras funcionalidades como pies de página y audios. Toda la nomeclatura se encuentra en el documento [sintaxis](syntax.md).