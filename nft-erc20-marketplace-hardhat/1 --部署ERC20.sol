pragma solidity ^0.8.0;

interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
    function approve(address spender, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

contract ERC20 is IERC20{
    uint public override  totalSupply;
    mapping(address=>uint) public override balanceOf;
    mapping(address=>mapping(address=>uint)) public override allowance;

    string public name = "jojoCoin";
    string public symbol = "jCoin";
    uint public decimal = 18;
 
    function transfer(address to, uint256 value) external override returns (bool){
        require(balanceOf[msg.sender]>value,"no enough coin");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
    
    function approve(address spender, uint256 value) external override returns (bool){
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender,spender,value);
        return true;
    }
    function transferFrom(address from, address to, uint256 value) external override returns (bool){
        require(allowance[from][msg.sender] > value, "no enough coin");
        allowance[from][msg.sender] -= value;
        require( balanceOf[from] > value, "no enough coin");
        balanceOf[from] -= value;
        balanceOf[to] += value;
        emit Transfer(from, to, value);
        return true;
    }

    function mint(uint256 value) external {
        balanceOf[msg.sender] += value;
        totalSupply += value;
        emit Transfer(address(0), msg.sender,value);
    }
    
    function burn(uint value) external {
        balanceOf[msg.sender] -= value;
        totalSupply -= value;
        emit Transfer(msg.sender, address(0), value);
    }



}