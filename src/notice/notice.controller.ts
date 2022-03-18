import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('notice')
export class NoticeController {
  constructor(private noticeService: NoticeService) {}

  @Post()
  create(@Body() createNoticeDto: CreateNoticeDto) {
    return this.noticeService.create(createNoticeDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Get()
  find(
    @Query('category') category?: string,
    @Query('title') title?: string,
    @Query('writer') writer?: string,
  ) {
    return this.noticeService.find(category, title, writer);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noticeService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.noticeService.delete(id);
  }

  @Delete()
  deleteAll() {
    return this.noticeService.deleteAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateNoticeDto: UpdateNoticeDto) {
    return this.noticeService.update(id, updateNoticeDto);
  }
}
