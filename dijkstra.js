function MinHeap(){
    this.items = new Array();
}
MinHeap.prototype.getD = function(item)
{
    return (Array.from(item.values())[0].get("d"));
}
MinHeap.prototype.getLeftChildIndex = function(parentIndex)
{
        return (2*parentIndex) + 1;
};
MinHeap.prototype.getRightChildIndex = function(parentIndex)
{
    return (2*parentIndex) + 2;
};
MinHeap.prototype.getParentIndex = function(childIndex)
{
    return Math.ceil((childIndex-1) / 2);
};
MinHeap.prototype.hasLeftChild = function(index)
{
    return this.getLeftChildIndex(index) < this.items.length;
};
MinHeap.prototype.hasRightChild = function(index)
{
    return this.getRightChildIndex(index) < this.items.length;
};
MinHeap.prototype.hasParent = function(index)
{
    return this.getParentIndex(index) >= 0;
};
MinHeap.prototype.leftChild = function(index)
{
    return this.items[this.getLeftChildIndex(index)];
};
MinHeap.prototype.rightChild = function(index)
{
    return this.items[this.getRightChildIndex(index)];
};
MinHeap.prototype.parent = function(index)
{
    return this.items[this.getParentIndex(index)];
};
MinHeap.prototype.swap = function(indexOne, indexTwo)
{
    var tmp = this.items[indexOne];
    this.items[indexOne] = this.items[indexTwo];
    this.items[indexTwo] = tmp;
};
MinHeap.prototype.peek = function()
{
    if(this.items.length != 0)
    {
        return this.items[0];
    }
    else
    {
        console.log("MinHeap:items: JEST PUSTY!")
    }
};
MinHeap.prototype.heapifyUp = function()
{
    var index = this.items.length -1;
    while(this.hasParent(index) && this.getD(this.parent(index)) > this.getD(this.items[index]))
    {
        this.swap(this.getParentIndex(index),index);
        index = this.getParentIndex(index);
    }
};
MinHeap.prototype.heapifyDown = function()
{
    var index = 0;
    while(this.hasLeftChild(index))
    {
        var smallerChildIndex = this.getLeftChildIndex(index);
        if(this.hasRightChild(index) && this.getD(this.rightChild(index)) < this.getD(this.leftChild(index)))
        {
            smallerChildIndex = this.getRightChildIndex(index);
        }
        if(this.getD(this.items[index]) <= this.getD((this.items[smallerChildIndex])))
        {
            break;   
        }
        else{
            this.swap(index,smallerChildIndex);
        }
        index = smallerChildIndex;
    }
};
MinHeap.prototype.poll = function()
{

    if(this.items.length != 0)
    {
        var tmp = this.items[0];
        this.items[0] = this.items[this.items.length-1]; 
        this.items.pop();
        this.heapifyDown();
        return tmp;
    }
    else
    {
        
        console.log("MinHeap:items: JEST PUSTY!")
    }
};
MinHeap.prototype.add = function(item)
{
    this.items.push(item);
    this.heapifyUp();
};
MinHeap.prototype.insertMap = function(m)
{
    var arr = Array.from(m);
    for(var i = 0;i<arr.length;i++)
    {
        var nmap = new Map();
        nmap.set(arr[i][0],arr[i][1]);
        this.add(nmap);
    }
}

//Obiekt krawedź
// u - początek
// v- koniec
// w - koszt
function Edge(u,v,w)
{
    this.u = u;
    this.v = v;
    this.w = w;
}
//Obiekt Graph
function Graph()
{
    //uzywamy slownikow to reprezentacji grafu


    // wszystkie wierzchołki grafu
    // każdy opsiany za pomocą struktury
    // d - koszt od s(source)
    // pred - poprzednik w kierunku punktu s
    this.vertices = new Map();

    //tablica sąsiedztwa 
    // adj[u] = sąsiedzi krawędzi u
    this.adj = new Map(); 

    //koszt poszczególnych krawędzi
    //początek u 
    //początek v 
    // wages[u][v] = koszt
    this.wages = new Map();
    //priority queue(zaimplementowany za pomocą kopca minimalnego)
    this.Q = new MinHeap();

}

Graph.prototype.processEdge = function(e)
{
    //jeżeli nie ma jeszcze w słowniku adj wierzchołka u, dodaj go!
    if(!this.adj.has(e.u))
    {
        this.adj.set(e.u,[]);
    }
    //jeżeli nie ma jeszcze w słowniku adj wierzchołka v, dodaj go!
    if(!this.adj.has(e.v))
    {
        this.adj.set(e.v,[]);
    }
    
    //dodaj sąsiedztwo wierzchołka u, czyli dodaj wierzchołek v
    this.adj.get(e.u).push(e.v);

    //jeżeli nie ma wag krawędzi wychodzących z u to daj je
    if(!this.wages.has(e.u))
    {
        this.wages.set(e.u,new Map());
    }
    //dodaj wage w dla krawędzi (u,v) 
    this.wages.get(e.u).set(e.v, e.w);

    //jeżeli nie ma  u dodaj ją i nadaj domyślne wartośći
    if(!this.vertices.has(e.u)){
        this.vertices.set(e.u, new Map());
        this.vertices.get(e.u).set("d",Infinity);
        this.vertices.get(e.u).set("pred",null);
        this.vertices.get(e.u).set("id",e.u);
    }
    //jeżeli nie ma  v dodaj ją i nadaj domyślne wartośći
    if(!this.vertices.has(e.v)){
        this.vertices.set(e.v, new Map());
        this.vertices.get(e.v).set("d",Infinity);
        this.vertices.get(e.v).set("pred",null);
        this.vertices.get(e.v).set("id",e.v);
    }
}

function getId(rec)
{
    //DOBRY KOD TEGO BY NIE POTRZEBOWAŁ :((((((((((((((
    //SPAGHETTI CODE !
    return Array.from(rec)[0][0];
}
var relaxFlag = false;
function relax(u,v,w)
{
    //Jeżeli koszt dotarcia do wierzchołka d jest droższy niż dotarcie za pomocą krawędzi (u,v)
    // dodkonaj akutalizacji
    console.log(relaxFlag);
    if(v.get("d") > (u.get("d") + w))
    {
        v.set("d", u.get("d") + w);
        v.set("pred",u.get("id"));
    }
    else{
        console.log(u);
        console.log(v);
        relaxFlag = true;
    }
}

function visualize(graph, source)
{
    var neighbours = graph.adj.get(source);
    for(var neighbour of neighbours)
    {
        if(relaxFlag)
        {
            document.getElementById(source+neighbour).innerHTML = "X"; 
            relaxFlag = false;
        }
        else{
            document.getElementById(source+neighbour).innerHTML = graph.vertices.get(neighbour).get("d");
        }
        if(document.getElementById(neighbour).getAttribute("fill") != "red" && document.getElementById(neighbour).getAttribute("fill" != "green"))
        {
            document.getElementById(neighbour).setAttribute("fill","red");
        }

    }
}

function dijkstra(graph, source)
{
    //Dopóki nie sprawdze wszystkich wierzchołków, iteruj!
    while(graph.Q.items.length != 0)
    {
        //wyciągni wierzchołek z najmniejszym kosztem i usuń z kopca!
        graph.Q.heapifyDown();
        graph.Q.heapifyUp();
        var u = graph.Q.poll();

        document.getElementById(getId(u)).setAttribute("fill","green");


        //za pomocą słownika adj zdobądź tablice id sąsiadów 
        var neighbours= graph.adj.get(getId(u));
        //wykonuj ciało pętli dla każdego sąsiada!
        for(var neighbour of neighbours)
        {
            //sprawdź czy istnieje połączenie między sąsiadami, ponieważ rozpatrujemy graf skierowany!
            // (u,v) != (v,u)
            if((graph.adj.get(getId(u))).includes(neighbour))
            {
                //sprawdzmy czy mozemy za pomocą krawędzi (u,v) zmieniszyć koszt dotarcia do wierzchołka v
                relax(graph.vertices.get(getId(u)),graph.vertices.get(getId(neighbour)),graph.wages.get(getId(u)).get(neighbour));
                visualize(graph,getId(u));
            }
        }
        break;
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    //utworz nowy obiekt grafu
    var graph = new Graph();

    //dodaj krawedzie grafu!
    graph.processEdge(new Edge("a","b",10));
    graph.processEdge(new Edge("a","c",6));
    graph.processEdge(new Edge("b","d",15));
    graph.processEdge(new Edge("c","d",4));
    graph.processEdge(new Edge("d","e",20));
    graph.processEdge(new Edge("e","h",1));
    graph.processEdge(new Edge("d","f",3));
    graph.processEdge(new Edge("f","h",4));

    //initalize single source
    //część zrobiona w funkcji processedge
    //ustawiamy nasz startowy wierzcholek na 0 aby priority queue zaczął od niego
    //reszta wierzchołków ma mieć koszt ustawiony na inf, a pred na null.
    graph.vertices.get("a").set("d", 0);

    //Wstaw wczytane wierzchołki do struktury minheap
    graph.Q.insertMap(graph.vertices);

    document.getElementById("next").addEventListener('click',function(){
        dijkstra(graph,"a");
    });
});