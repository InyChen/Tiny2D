function sudo(data) {
    let dataLeft = [];
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    arr.forEach(function(i, index) {
        let row = [];
        arr.forEach(function(j, index) {
            row.push(new Set(arr));
        })
        dataLeft[index] = row;
    });

    var calc = function() {
        data.forEach(function(item, i) {
            item.forEach(function(num, j) {
                if (num != 0) {
                    dataLeft[i][j].clear();
                    //清除本行/列
                    dataLeft[i].forEach(function(rowItem) {
                        rowItem.delete(num);
                    });
                    arr.forEach(function(colItem, index) {
                        dataLeft[index][j].delete(num);
                    })
                }
            })
        })

        dataLeft.forEach(function(row, rowIndex) {
            let one = false;
            row.forEach(function(col, colIndex) {
                if (col.size == 1) {
                    console.log("!!!!", rowIndex, colIndex, col);
                    data[rowIndex][colIndex] = col;
                    one = true;
                }
            });
            row.forEach(function(col, colIndex) {
                if (col.size == 2) {
                    console.log(rowIndex, colIndex, col);
                }
                if (col.size == 1) {
                    console.log("!!!!", rowIndex, colIndex, col);
                    data[rowIndex][colIndex] = col;
                }
            });
        });
    }

    calc();
}
module.exports = sudo;