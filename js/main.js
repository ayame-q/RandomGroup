/**
 Random Group main.js

 Copyright (c) 2019 ayame.space

 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
 */
function shuffle_arr(array) {
	for (let i = array.length - 1; i >= 0; i--){
		const rand = Math.floor( Math.random() * ( i + 1 ) );
		[array[i], array[rand]] = [array[rand], array[i]]
	}
	return array
}
function randomgroup() {
	let group_length = document.getElementById("group_length").value
	let member_num = document.getElementById("member_num").value
	const source_str = document.getElementById("source").value
	let source = source_str.replace(/(\r)?\n/g, ",").split(",").filter(Boolean)
	let max_name_length = 0
	if(!group_length.match(/[0-9]+/)){
		group_length = Math.ceil(source.length / member_num)
	}
	if(!member_num.match(/[0-9]+/)){
		member_num = Math.ceil(source.length / group_length)
	}
	let result = []
	for (let i = 0; i < group_length; i++){
		result[i] = []
	}
	for (let i = 0; i < source.length; i++){
		let m = source[i].match(/(.+):([0-9]+)/)
		if(m){
			result[m[2] - 1].push(m[1])
			source[i] = null
		}
	}
	source = source.filter(Boolean)
	const shuffled = shuffle_arr(source)

	let now = 0
	for (let x of shuffled){
		while (result[now].length >= member_num){
			if(now < group_length - 1){
				now += 1
			}else{
				now = 0
			}
		}
		if(result[now].length < member_num){
			result[now].push(x)
		}

		if(now < group_length - 1){
			now += 1
		}else{
			now = 0
		}
	}
	let dl_result = document.querySelector("#result > dl")
	dl_result.textContent = null
	for (let i = 0; i < result.length; i++) {
		const div_group = document.createElement("div")
		div_group.classList.add("group")
		dl_result.appendChild(div_group)
		const dt = document.createElement("dt")
		dt.textContent = "グループ" + (i + 1)
		div_group.appendChild(dt)
		const dd = document.createElement("dd")
		div_group.appendChild(dd)
		for (let j = 0; j < result[i].length; j++) {
			if(max_name_length < result[i][j].length){
				max_name_length = result[i][j].length
			}
			const li = document.createElement("li")
			li.textContent = result[i][j]
			dd.appendChild(li)
		}
	}

	let columns
	if(window.innerWidth >= 1200){
		columns = 3
	}else if(window.innerWidth >= 600) {
		columns = 2
	}else{
		columns = 1
	}
	const vw = 100 / (max_name_length * columns + 3 * columns)

	const dom_style = document.getElementById("style_font_size")
	dom_style.textContent = `
            section#result dt{
            font-size: ${vw*1.2}vw
            }
            section#result li{
            font-size: ${vw}vw
            }`

	document.getElementById("inputform").classList.add("hidden")
	document.getElementById("result").classList.remove("hidden")
	return false
}
function backinput() {
	document.getElementById("inputform").classList.remove("hidden")
	document.getElementById("result").classList.add("hidden")
}
function on_input(dom_id) {
	const other_id = {group_length: "member_num", member_num: "group_length"}
	const other = document.getElementById(other_id[dom_id])
	if(document.getElementById(dom_id).value !== ""){
		other.value = ""
		other.setAttribute("readonly", "readonly")
	}else{
		other.removeAttribute("readonly")
	}
	return true
}