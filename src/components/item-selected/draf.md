<motion.div
className={classnames(
"w-[70%] h-[90%] flex flex-col overflow-hidden",
"bg-black rounded-[50%] relative"
)}
animate={{ rotateY: [0, 90] }}
transition={{
                duration: 0.5,
                ease: 'easeInOut',
                times: [0, 0.5, 1],
                repeatDelay: 1,
              }} >
<div
className={classnames(
"w-22 h-22 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[50%] overflow-hidden z-10",
)} >
<img alt={itemSelected.album_title} src={itemSelected?.cover} />
</div>
<div className="bg-black w-5 h-5 absolute top-[46%] left-[46%] z-20 rounded-full" />
</motion.div>
