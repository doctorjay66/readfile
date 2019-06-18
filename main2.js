function processDir(fileSystemType) {
      alert("processDir: " + fileSystemType);
      //Get a handle to the local file system (allocate 1 Mb for
      // storage)
      window.requestFileSystem(fileSystemType, 1024 * 1024, onGetFileSystemSuccess, onFileError);
}
