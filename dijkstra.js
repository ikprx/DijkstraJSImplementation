// klasa wierzcholek
// d - odleglosc od s - source
// pred - poprzednik w drodze do source
function Vertex(d = Number.POSITIVE_INFINITY, pred=null)
{
    this.d = d;
	this.pred = pred;
}
//funkcja potrzebna przy minheap do heapify
// porownuje odleglosci miedzy dwoma wierzcholkami
Vertex.prototype.compare = function(other)
{
    return this.d > other.d;
}

// TUTAJ IMPLEMENTUJE MIN-HEAP
// NIE JEST TO KONIECZNE DO ZROZUMIENIA DIJKSTRA!
// JEDYNE CO MUSISZ WIEDZIEĆ O TYM, TO TO, ŻE JEST TO STRUKTURA DRZEWA, GDZIE NA SAMEJ GÓRZE JEST NAJMNIEJSZY ELEMENT
// https://youtu.be/t0Cq6tVNRBA - dobry tutorial!
// jako item przyjmuje tablie 3 elementową
function MinHeap(){
    // elementy naszego heapa
    this.items = new Array();
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
    return getLeftChildIndex(index) < this.items.length;
};
// ma prawa galaz ?
MinHeap.prototype.hasLeftChild = function(index)
{
    return getRightChildIndex(index) < this.items.length;
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
    while(this.hasParent(index) && this.parent(index).compare(this.items[index]))
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
        if(this.hasRightChild(index) && !this.rightChild(index).compare(this.leftChild(index)))
        {
            smallerChildIndex = this.getRightChildIndex(index);
        }
        if(!this.items[index].compare(items[smallerChildIndex]))
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
        heapifyDown();
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


window.onload = function()
{
    var h = new MinHeap();
    h.add(new Vertex(30,20));
    h.add(new Vertex(50,20));
    h.add(new Vertex(10,20));
    h.add(new Vertex(80,20));
    h.add(new Vertex(60,20));
    console.log(h.peek());
};
