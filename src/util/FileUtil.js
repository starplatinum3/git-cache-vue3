function getFileBlob(file) {
    var data = file.split(',')[1];
    // atob方法用于解码使用 base-64 编码的字符串。
    data = window.atob(data);
    // Uint8Array 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。
    var ia = new Uint8Array(data.length);
    for (var i = 0; i < data.length; i++) {
      ia[i] = data.charCodeAt(i);
    }
    // Blob() 构造函数返回一个新的 Blob 对象。 blob的内容由参数数组中给出的值的串联组成。
    return new Blob([ia], {type: 'image/png'});
  }

  const FileUtil={
    getFileBlob
}

export default FileUtil