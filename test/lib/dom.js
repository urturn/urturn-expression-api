function createExpressionDOM(){
  var node = document.querySelector('.webdoc_expression_wrapper');
  if(!node){
    node = document.createElement('div');
    node.className = 'webdoc_expression_wrapper';
    document.body.appendChild(node);
  } else {
    node.innerHTML = "";
  }
}