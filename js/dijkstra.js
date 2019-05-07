let animTime = 1000;
function Vertex(pred,d,id)
{
    this.pred = pred;
    this.d = d;
    this.id = id;
}

function Edge(u, v, w)
{
    this.u = u;
    this.v = v;
    this.w = w;
}

function Graph()
{
    this.vertices = new Map();
    this.adj = new Map();
    this.wages = new Map(); 

    this.Q = new MinHeap();
}

Graph.prototype.processEdge = function(e)
{
    if(!this.adj.has(e.u))
    {
        this.adj.set(e.u, []);
    }

    if(!this.adj.has(e.v))
    {
        this.adj.set(e.v, []);
    }

    this.adj.get(e.u).push(e.v);

    if(!this.wages.has(e.u))
    {
        this.wages.set(e.u, new Map());
    }
    this.wages.get(e.u).set(e.v, e.w);

    if(!this.vertices.has(e.u))
    {
            var vertU = new Vertex();
            vertU.d = Infinity;
            vertU.pred = null;
            vertU.id = e.u;
            this.vertices.set(e.u, vertU);
            this.Q.add(vertU);
    }

    if(!this.vertices.has(e.v))
    {
            var vertV = new Vertex();
            vertV.d = Infinity;
            vertV.pred = null;
            vertV.id = e.v;
            this.vertices.set(e.v, vertV);
            this.Q.add(vertV);
    }
}

Graph.prototype.applyWagesSVG = function()
{
    for(var node of this.adj.keys())
    {
        for(var nodeNeighbour of this.adj.get(node))
        {
            document.getElementById(node+nodeNeighbour).innerHTML = this.wages.get(node).get(nodeNeighbour);
        }
    } 
}

function relax(u, v, w)
{
    if(v.d > (u.d + w))
    {
        v.d = u.d + w;
        v.pred = u.id;
        return true;
    }
    return false;
}


function colorNode(node, color, start, durr)
{
    setTimeout(function(){
        document.getElementById(node).setAttribute("fill", color);
    },start);
    setTimeout(function(){
        document.getElementById(node).setAttribute("fill", "white");
    },start+durr);
}

function colorRecord(record, color, start, durr)
{
    setTimeout(function(){
        document.getElementById(record).style.backgroundColor = color;
    },start);
    setTimeout(function(){
        document.getElementById(record).style.backgroundColor = "WHITE";
    },start+durr);
}

function updateRecord(vertex, start)
{

    setTimeout(function(){
        document.getElementById(vertex.id+"predtab").innerHTML = vertex.pred;
        document.getElementById(vertex.id+"dtab").innerHTML = vertex.d;
    },start);
}

function dijkstra(graph, source)
{
    //USTAWIAMY D WIERZCHOLKA ZRODLOWEGO NA 0 ABY MINHEAP ZWROCIL TO JAKO PIERWSZY REKORD  
    graph.vertices.get(source).d = 0;
    graph.vertices.get(source).pred = "NONE";
    i = 0;
    var showRoute; 

    //DOPOKI KOLEJKA ZAWIERA JESZCZE WIERZCHOLKI WYKONUJ KOD
    while(graph.Q.items.length != 0)
    {
        graph.Q.heapifyDown();
        graph.Q.heapifyUp();

        //ZWORC WIERZCHOLEK Z NAJMNIEJSZYM D I WYRZUC GO Z KOLEJKI
        var u = graph.Q.poll();

        //ZWORC TABLICE WIERZCHOLKOW SASIADUJACYCH
        // graph.adj.get("a") = {"b", "c"}
        var adjNodes = graph.adj.get(u.id);

        //DLA KAZDEGO SASIADA ......
        for(var adjNodeId of adjNodes)
        {
            clearTimeout(showRoute);

            //MAMY TYLKO ID SASIADA A NIE CALA STRUKTURE !
            //POBIERZ CALA STRUKTURE !
            var adjNode = graph.vertices.get(adjNodeId);
            //JEZELI KRAWEDZ MIEDZY (u,v) jest efektywniejsza niz (v.pred, v) AKTUALIZUJ!
            relax(u, adjNode, graph.wages.get(u.id).get(adjNode.id));

            colorNode(u.id, "green",i, animTime);
            colorRecord(u.id+"row","green",i,animTime);
            updateRecord(u,i);
            colorNode(adjNode.id, "red",i, animTime);
            colorRecord(adjNode.id+"row","red",i,animTime);
            updateRecord(adjNode,i);
            i+=animTime;

            showRoute = setTimeout(function(){
                document.getElementById("to").style.display = "inline";
                document.getElementById("startRoute").style.display = "inline";
            },i);
        }
        }
}

function createTable(vertices)
{
    var table = document.createElement("table");

    var row = document.createElement("tr");

    var vertElement = document.createElement("th");
    var vertNode = document.createTextNode("VERTEX")
    vertElement.appendChild(vertNode);
    row.appendChild(vertElement);

    var dElement = document.createElement("td");
    var dNode = document.createTextNode("COST");
    dElement.appendChild(dNode);
    row.appendChild(dElement);

    var predElement = document.createElement("td");
    var predNode = document.createTextNode("PREDECESSOR");
    predElement.appendChild(predNode);
    row.appendChild(predElement);

    table.appendChild(row);
    for(var vert of vertices.keys())
    {
        var row = document.createElement("tr");
        row.id = vert + "row";

        var vertElement = document.createElement("th");
        var vertNode = document.createTextNode(vert)
        vertElement.appendChild(vertNode);
        vertElement.id = vert + "idtab";
        row.appendChild(vertElement);

        var dElement = document.createElement("td");
        var dNode = document.createTextNode(vertices.get(vert).d);
        dElement.appendChild(dNode);
        dElement.id = vert + "dtab";
        row.appendChild(dElement);

        var predElement = document.createElement("td");
        var predNode = document.createTextNode(vertices.get(vert).pred);
        predElement.appendChild(predNode);
        predElement.id = vert + "predtab";
        row.appendChild(predElement);

        table.appendChild(row);
    }
    document.getElementById("forTable").appendChild(table);
}

function createEdge(src, dest)
{
    var row = document.createElement("tr");
    var srcEle = document.createElement("td");
    srcEle.appendChild(document.createTextNode(src));
    var arrow = document.createElement("td");
    arrow.appendChild(document.createTextNode("---->"));
    var destEle = document.createElement("td");
    destEle.appendChild(document.createTextNode(dest));
    srcEle.style.borderWidth = "0px";
    arrow.style.borderWidth = "0px";
    destEle.style.borderWidth = "0px";

    row.appendChild(srcEle);
    row.appendChild(arrow);
    row.appendChild(destEle);
    return row;
}

function addEdge(edge, start)
{
    setTimeout(function()
    {
        document.getElementById("forRoute").appendChild(edge);
    }
    ,start);
}

function showRoute(verticies, dest)
{
    document.getElementById("startRoute").disabled = true;
    document.getElementById("forRoute").innerHTML = "";
    var route = new Array(); 
    var lastNode = dest;
    var  i = 0;

    var edges = new Array();
    while(lastNode != "NONE")
    {
        console.log(lastNode);
        route.push(lastNode);
        colorNode(lastNode,"RED",i,animTime);
        colorRecord(lastNode+"idtab","RED",i,animTime);
        colorRecord(lastNode+"predtab","GREEN",i,animTime);
        var dest = lastNode;
        lastNode = verticies.get(lastNode).pred;
        colorNode(lastNode,"GREEN",i,animTime);
        edges.push(createEdge(lastNode, dest));
        i+=animTime;
    }
    var x = setTimeout(function(){document.getElementById("startRoute").disabled = false;  }, Infinity);

    while(route.length != 0)
    {
        clearTimeout(x);
        var currentNode = route.pop();
        colorNode(currentNode,"GREEN",i,animTime);
        addEdge(edges.pop(),i);
        x = setTimeout(function(){document.getElementById("startRoute").disabled = false;  }, i);
        i+=animTime;
    }
}

window.onload = function()
{
    document.getElementById("to").style.display = "none";
    document.getElementById("startRoute").style.display = "none";

    var graph = new Graph();
    graph.processEdge(new Edge("a","b",10));
    graph.processEdge(new Edge("a","c",6));
    graph.processEdge(new Edge("b","d",15));
    graph.processEdge(new Edge("c","d",4));
    graph.processEdge(new Edge("d","e",20));
    graph.processEdge(new Edge("e","h",1));
    graph.processEdge(new Edge("d","f",3));
    graph.processEdge(new Edge("f","h",4));

    graph.applyWagesSVG();

    document.getElementById("startDijkstra").addEventListener("click",function(){
        createTable(graph.vertices);
        dijkstra(graph,"a");
        document.getElementById("startDijkstra").parentNode.removeChild(document.getElementById("startDijkstra"));
    });
    document.getElementById("startRoute").addEventListener("click",function(){
        var vert = document.getElementById("to").value;
        for(var key of graph.vertices.keys())
        {
            if(key == vert)
            {
                showRoute(graph.vertices, vert);
            }
        }
    });
}
