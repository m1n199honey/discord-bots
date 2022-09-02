if ( c == 'a'){
    temp = word[(i + 1):]
    self.insert('4' + temp, crawler)
    self.insert('@' + temp, crawler)
}


if ( c == 'c'){
    temp = word[(i + 1):]
    self.insert('(' + temp, crawler)
    self.insert('[' + temp, crawler)
}


if ( c == 'e'){
    temp = word[(i + 1):]
    self.insert('3' + temp, crawler)
}


if ( c == 'g'){
    temp = word[(i + 1):]
    self.insert('6' + temp, crawler)
}

if ( c == 'i'){
    temp = word[(i + 1):]
    self.insert('|' + temp, crawler)
    self.insert('!' + temp, crawler)
}

if ( c == 'j'){
    temp = word[(i + 1):]
    self.insert(']' + temp, crawler)
}

if ( c == 'l'){
    temp = word[(i + 1):]
    self.insert('1' + temp, crawler)
}

if ( c == 'o'){
    temp = word[(i + 1):]
    self.insert('0' + temp, crawler)
}

if ( c == 's'){
    temp = word[(i + 1):]
    self.insert('5' + temp, crawler)
    self.insert('$' + temp, crawler)

}
if ( c == 't'){
    temp = word[(i + 1):]
    self.insert('7' + temp, crawler)
}

if ( c == 'z'){
    temp = word[(i + 1):]
    self.insert('2' + temp, crawler)
}