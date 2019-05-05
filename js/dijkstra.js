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
var colorNodeAnim = 0
function colorNode(node,color)
{
    setTimeout(function(){
        document.getElementById(node).setAttribute("fill", color);
    },colorNodeAnim);

    colorNodeAnim += 200;

    setTimeout(function(){
        document.getElementById(node).setAttribute("fill", "white");
    },colorNodeAnim);
} 


function showRoute(vertices, dest) 
{
    var route = []; 
    var lastNode = vertices.get(dest); 

    route.push(dest);
    do
    {
        colorNodeAnim(lastNode.id, "RED");
        lastNode = vertices.get(lastNode.pred);
        route.push(lastNode.id);
    }
    while(lastNode.pred != "NONE");


    while(route.length != 0)
    {
        console.log(route.pop());
    }
}

function createShowRoute(graph)
{
    var input = document.createElement("input");
    input.setAttribute("type","text");
    document.body.appendChild(input);

    var button = document.createElement("button");
    var node = document.createTextNode("Show route!");
    button.append(node);
    document.body.appendChild(button);


    button.addEventListener("click", function(){
        showRoute(graph.vertices, input.value);
    });
}

var lastAnim = 0;
var timerShowRoute;
function showNodeCheck(source, dest, graph)
{
    clearTimeout(timerShowRoute);
    setTimeout(function(){
        document.getElementById(source.id).setAttribute("fill", "green");
        document.getElementById(dest.id).setAttribute("fill", "red");
        document.getElementById(source.id+"row").style.backgroundColor = "green"; 
        document.getElementById(dest.id+"row").style.backgroundColor = "red"; 

        document.getElementById(source.id+"dtab").innerHTML = source.d;
        document.getElementById(source.id+"predtab").innerHTML = source.pred;
        document.getElementById(dest.id+"dtab").innerHTML = dest.d;
        document.getElementById(dest.id+"predtab").innerHTML = dest.pred;
    },lastAnim);

    lastAnim += 200;

    setTimeout(function(){
        document.getElementById(source.id).setAttribute("fill", "white");
        document.getElementById(dest.id).setAttribute("fill", "white");
        document.getElementById(source.id+"row").style.backgroundColor = "white"; 
        document.getElementById(dest.id+"row").style.backgroundColor = "white"; 
    },lastAnim);
    timerShowRoute = setTimeout(function(){
        createShowRoute(graph);
    }, lastAnim);
}

function dijkstra(graph, source)
{
    graph.vertices.get(source).d = 0;
    graph.vertices.get(source).pred = "NONE";

    while(graph.Q.items.length != 0)
    {
        graph.Q.heapifyDown();
        graph.Q.heapifyUp();

        var u = graph.Q.poll();

        var adjNodes = graph.adj.get(u.id);

        for(var adjNodeId of adjNodes)
        {
            var adjNode = graph.vertices.get(adjNodeId);
            relax(u, adjNode, graph.wages.get(u.id).get(adjNode.id));
            showNodeCheck(u, adjNode, graph);
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
    document.body.appendChild(table);
}

window.onload = function()
{
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
}