export default class HashMap {
    constructor(capacity = 16, loadfactor = 0.75) {
        this.buckets = new Array(16).fill(null).map(() =>[]);
        this.loadfactor = loadfactor;
        this.threshold = Math.floor(this.buckets.length * this.loadfactor)
        this.size = 0;
    }

    checkIndex(index) {
        if(index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound") ;
        }
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        // Ensure the hash code is positive and within bucket bounds
        return Math.abs(hashCode) % this.buckets.length;
      } 
     
    set(key, value) {
        const index = this.hash(key);
        this.checkIndex(index);

        for(let i = 0; i < this.buckets[index].length; i++) {
            if (this.buckets[index][i][0] == key) {
                this.buckets[index][i][1] = value;
                return;
            }
        }

        this.buckets[index].push([key, value]);
        this.size++;

        if(this.size >= this.threshold) {
            this.resize();
        }
    }

    get(key) {
        const index = this.hash(key);
        this.checkIndex(index);
        for (let [storedKey, value] of this.buckets[index]) {
            if (storedKey == key) {
                return value;
            }
        }
        return null;
    }

    has(key) {
        const index = this.hash(key); 
        this.checkIndex(index);

        for (let [storedKey] of this.buckets[index]) {
            if (storedKey == key) {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        const index = this.hash(key); 
        this.checkIndex(index);

        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] == key) {
            bucket.splice(i, 1);
            this.size--;
            return true
            }
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = Array(16).fill(null).map(() =>[]);
        this.size = 0;
    }

    keys() {
        return this.buckets.flatMap((bucket) => bucket.map(([key]) => key))
    }

    values() {
        return this.buckets.flatMap((bucket) => bucket.map(([_key, value]) => value))
    }

    entries() {
        return this.buckets.flatMap((bucket) => bucket.map(([key, value]) => [key, value])
        );
    }

    resize () {
        const oldBuckets = this.buckets;
        this.buckets = Array(oldBuckets.length * 2).fill(null).map(() => []);
        this.threshold = Math.floor(this.buckets.length * this.loadfactor);
        this.size = 0;
        
        for(let bucket of oldBuckets) {
            for(let [key, value] of bucket) {
                this.set(key, value);
            }
        }
    }

}


