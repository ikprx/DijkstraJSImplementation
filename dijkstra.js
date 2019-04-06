// TUTAJ IMPLEMENTUJE MIN-HEAP
// NIE JEST TO KONIECZNE DO ZROZUMIENIA DIJKSTRA!
// JEDYNE CO MUSISZ WIEDZIEĆ O TYM, TO TO, ŻE JEST TO STRUKTURA DRZEWA, GDZIE NA SAMEJ GÓRZE JEST NAJMNIEJSZY ELEMENT
// https://youtu.be/t0Cq6tVNRBA - dobry tutorial!
// jako item przyjmuje tablie 3 elementową
//  u : [0]
//  v : [1]
//  w: [2]
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
        return this.items[0][2];
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
    while(this.hasParent(index) && this.parent(index)[2] > this.items[index][2])
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
        if(this.hasRightChild(index) && this.rightChild(index)[2] < this.leftChild(index)[2])
        {
            smallerChildIndex = this.getRightChildIndex(index);
        }
        if(this.items[index].w < items[smallerChildIndex][2])
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

// Graph - graf
// tablica z krawdziami, ktore sa tablica
// [u,v,w] , u - poczatek, v - koniec, w - waga
// Source - początek
function Dijkstra(Graph,source)
{
    // wierzcholki obliczone
    
}

window.onload = function()
{

};