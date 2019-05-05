function MinHeap(){
    this.items = new Array();
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
    while(this.hasParent(index) && this.parent(index).d > this.items[index].d)
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
        if(this.hasRightChild(index) && this.rightChild(index).d < this.leftChild(index).d)
        {
            smallerChildIndex = this.getRightChildIndex(index);
        }
        if(this.items[index].d <= this.items[smallerChildIndex].d)
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