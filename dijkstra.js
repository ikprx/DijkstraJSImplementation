function MinHeap(){
    // elementy naszego heapa
    this.items = new Array();
}

MinHeap.prototype.getD = function(item)
{
    return (Array.from(item.values())[0].get("d"));
}

//lewa galaz od rodzica
MinHeap.prototype.getLeftChildIndex = function(parentIndex)
{
        return (2*parentIndex) + 1;
};
//prawa galaz od rodzica
MinHeap.prototype.getRightChildIndex = function(parentIndex)
{
    return (2*parentIndex) + 2;
};
// zwroc rodzica
MinHeap.prototype.getParentIndex = function(childIndex)
{
    return Math.ceil((childIndex-1) / 2);
};
// ma lewa galaz ?
MinHeap.prototype.hasLeftChild = function(index)
{
    return this.getLeftChildIndex(index) < this.items.length;
};
// ma prawa galaz ?
MinHeap.prototype.hasLeftChild = function(index)
{
    return this.getRightChildIndex(index) < this.items.length;
};

//ma rodzica ? 
MinHeap.prototype.hasParent = function(index)
{
    return this.getParentIndex(index) >= 0;
};

//zwroc lewa galaz - wartosc nie indeksach!
MinHeap.prototype.leftChild = function(index)
{
    return this.items[this.getLeftChildIndex(index)];
};

//zwroc prawa galaz - wartosc nie indeksach!
MinHeap.prototype.rightChild = function(index)
{
    return this.items[this.getRightChildIndex(index)];
};

//zwroc rodzica - wartosc nie indeksach!
MinHeap.prototype.parent = function(index)
{
    return this.items[this.getParentIndex(index)];
};
// zamien dwa elementy w poszczegolnych indeksach
MinHeap.prototype.swap = function(indexOne, indexTwo)
{
    var tmp = this.items[indexOne];
    this.items[indexOne] = this.items[indexTwo];
    this.items[indexTwo] = tmp;
};
//zwroc wartosc pierwszego elementu
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
//popraw kolejnosc w heapie
MinHeap.prototype.heapifyUp = function()
{
    var index = this.items.length -1;
    //while(this.hasParent(index) && this.parent(index).compare(this.items[index]))
    while(this.hasParent(index) && this.getD(this.parent(index)) > this.getD(this.items[index]))
    {
        this.swap(this.getParentIndex(index),index);
        index = this.getParentIndex(index);
    }
};
//popraw kolejnosc w heapie
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
        if(this.getD(this.items[index]) < this.getD((items[smallerChildIndex])))
        {
            break;   
        }
        else{
            swap(index,smallerChildIndex);
        }
        index = smallerChildIndex;
    }
};

// zwroc element, nie tylko wartosc 
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
// dodaj element
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

//Obiekt krawedz
// u - poczatek
// v- koniec
// w - koszt
function Edge(u,v,w)
{
    this.u = u;
    this.v = v;
    this.w = w;
}

function Graph()
{
    //uzywamy slownikow to reprezentacji grafu
    //wierzcholki
    // wszystkie wierzcholki
    // kazdy wierzchoek opsiany przez strukture
    // d - koszt od s(source)
    // pred - poprzednik w kierunku punktu s
    this.vertices = new Map();
    //tablica sasiedztwa
    // adj[u] = sasiedzi krawedzi u
    this.adj = new Map(); 
    //kosztu poszczegolnych krawedzi
    // wages[u][v] = koszt
    this.wages = new Map();
}

Graph.prototype.processEdge = function(e)
{
    if(!this.adj.has(e.u))
    {
        this.adj.set(e.u,[]);
    }
    if(!this.adj.has(e.v))
    {
        this.adj.set(e.v,[]);
    }

    this.adj.get(e.u).push(e.v);
    this.adj.get(e.v).push(e.u);

    if(!this.wages.has(e.u))
    {
        this.wages.set(e.u,new Map());
    }
    this.wages.get(e.u).set(e.v, e.w);

    if(!this.vertices.has(e.u)){
        this.vertices.set(e.u, new Map());
        this.vertices.get(e.u).set("d",Infinity);
        this.vertices.get(e.u).set("pred",null);
    }
    if(!this.vertices.has(e.v)){
        this.vertices.set(e.v, new Map());
        this.vertices.get(e.v).set("d",Infinity);
        this.vertices.get(e.v).set("pred",null);
    }
}

function dijkstra(graph, source)
{
    //initalize single source
    //czesc zrobiona przez funkcje process Edge
    console.log("hello!");
    graph.vertices.get(source).set("d", 0);
    //krawedzie zaliczone
    var S = new Map();
    //krawedzi do zaliczenia
    var Q = new MinHeap();
    Q.insertMap(graph.vertices);
    while(Q.items.length != 0)
    {
        var u = Q.poll();
        console.log(u); 
    }
}

window.onload = function()
{
 

    var graph = new Graph();
    graph.processEdge(new Edge("x","t",10));
    graph.processEdge(new Edge("x","y",5));
    //console.log(graph.adj);
    //console.log(graph.wages);
    //console.log(graph.vertices);

    dijkstra(graph,"x");
};