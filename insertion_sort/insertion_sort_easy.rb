#sorts the last element only

def insertionSort(ar) 
    num = ar.last
    index = ar.length - 2
    
   while index >= 0
    if num < ar[index] 
        ar[index + 1] = ar[index]
        print ar
    else
        ar[index + 1] = num
        print ar
    end
    index-=1
   end

end

insertionSort([2,4,6,8,3])