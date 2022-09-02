let ALPHABET_SIZE = 26;
class TrieNode {
    constructor() {
        this.isEndOfWord = false;
        this.children = new Array(ALPHABET_SIZE);
        for (let i = 0; i < ALPHABET_SIZE; i++)
            this.children[i] = null;
    }
}