def insertionSort(ar) 
    num = ar.last
    index = ar.length - 2
    
   while index >= 0
    if num < ar[index] 
        ar[index + 1] = ar[index]
        print ar
    else
        ar[index + 1] = num
        index = -1
        print ar
    end
    index-=1
   end

end

insertionSort([2,4,6,8,3]) 

# Notes on the logic:

# 7 2 4 1 5 3

# split the array into a sorted subset and an unsorted subset

# at the start all are in the unsorted subset

# take one card at a time from the unsorted subset, and insert it into the sorted part

# start with the zeroth element and move it into the sorted part 

# determine whether it neeeds to be inserted before or after or in between 

# ---

# divide the array into two subsets

# index 0 is part of the sorted subset

# all other elems are part of the unsorted subset

# take elems from the unsorted subset and keep insterting them into the sorted subset until unsorted becomes empty

# --

# take the first elem from the unsorted subset and store it in a variable

# val = 2

# create a whole there

# to insert 2 into the sorted ubset

# shifgt all numbers greater than 2 in the sorted part by one posiiton to the right

# fill up 2 in the whole in the sorted part

# ---

# now we are sorted to index 1

# ---

# take the value of tyhe unsorted part from index 2

# ---

# start at position 1 and check if the numbers is greater than 4, shift all nums greater than 4 one by one to the right, 7 is greater than 4 so 7 is shifted to index 2 and the whole now move to  index 1, 2 is les than 4 so no more shifting is needed

# ---

# if the number at position 1 is less than te number at position 0

# in the sorted section, shift all numbers greater than 2 to the right

# store the value of position 1, shift all numbers to the right, and set the value of position 0 to the value of what was in posiiton 1

# keep [ocking elements and inserting them until the unsorted subset becomes empty

# ---

# ar = [7, 2, 4, 1, 5, 3]

# def insertion_sort(ar)
#   print ar
# end

# insertion_sort(ar)

