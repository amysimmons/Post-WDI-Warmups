class Fixnum

  ROMAN_NUMBERS = {
    1000 => "M",  
     900 => "CM",  
     500 => "D",  
     400 => "CD",
     100 => "C",  
      90 => "XC",  
      50 => "L",  
      40 => "XL",  
      10 => "X",  
        9 => "IX",  
        5 => "V",  
        4 => "IV",  
        1 => "I",  
  }

  def to_roman
    n = self
    roman = ""
    # iterates through the roman_numbers hash
    ROMAN_NUMBERS.each do |value, letter|
      # pushes into the roman string the letter when n divided by that letter is > 0 
      # for example, 2000 / 1000 is 2, so M will be pushed into roman two times
      roman << letter*(n / value)
      # this line gets the remainder of n, for example if n is 2200, n % the value of 1000 leaves 200
      # 200 will then be divided by every value resulting in 0 until it gets to 100, which will result in 2,
      # meaning two C's get pushed into roman
      n = n % value
    end
    roman
  end
end

# Understanding the above solution:

# the case of 1024:
# 1024 divided by 1000 will result in 1
# so M will be pushed into roman once
# n is now set to the remainder of 1024 from 1000 , which is is 24

# 24 divided by all the roman_numbers values is 0 until it gets to 10
# 24 / 10 is 2, because 10 goes into 24 2 times
# this means X will be pushed into roman twice
# n is now set to the remainder of 24 from 10, which is 4

# 4 divided by all the roman_numbers values is 0 until it reaches the value of 4,
# which results in 1, so IV is pushed into roman once
# the remainder of 4 from 4 is 0, so there is nothing left to do 

# 1024 should return MXXIV

# My initial attempt below - working but crappy:

# class Fixnum

#   def to_roman

#     num = self

#     roman = ''

#     romans = { 
#       :I => 1,
#       :II => 2,
#       :III => 3,
#       :IV => 4,
#       :V => 5,
#       :VI => 6,
#       :VII => 7,
#       :VIII => 8,
#       :IX => 9,
#       :X => 10,
#       :XX => 20,
#       :XXX => 30,
#       :XL => 40,
#       :L => 50,
#       :LX => 60,
#       :LXX => 70,
#       :LXXX => 80,
#       :XC => 90,
#       :C => 100,
#       :CC => 200,
#       :CCC => 300,
#       :CD => 400,
#       :D => 500,
#       :DC => 600,
#       :DCC => 700,
#       :DCCC => 800,
#       :CM => 900,
#       :M => 1000,
#       :MM => 2000,
#       :MMM => 3000
#      }

# Break the number into Thousands, Hundreds, Tens and Ones, and write down each in turn.

#     num_split = num.to_s.chars.map{|e|e.to_i}

#     if num_split.length >= 4
#       thousands = num_split.reverse[3]*1000
#       roman << romans.key(thousands).to_s
#     end

#     if num_split.length >= 3
#       hundreds = num_split.reverse[2]*100
#       roman << romans.key(hundreds).to_s
#     end

#     if num_split.length >= 2
#       tens = num_split.reverse[1]*10
#       roman << romans.key(tens).to_s
#     end

#     if num_split.length >= 1
#       ones = num_split.reverse[0]*1
#       roman << romans.key(ones).to_s
#     end

#     roman

#   end

# end
